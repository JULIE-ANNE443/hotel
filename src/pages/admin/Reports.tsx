import React, { useState } from 'react';
import { FileText, Download, Filter, Printer } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface Report {
  id: string;
  type: string;
  data: any;
  generatedAt: Date;
}

export default function AdminReports() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportType, setReportType] = useState<'sales' | 'inventory' | 'revenue'>('sales');

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      let data;
      switch (reportType) {
        case 'sales':
          const { data: salesData } = await supabase
            .from('orders')
            .select(`
              *,
              profiles (first_name, last_name),
              order_items (
                quantity,
                price,
                products (name, hotel_id)
              )
            `)
            .order('created_at', { ascending: false });
          data = salesData;
          break;

        case 'inventory':
          const { data: inventoryData } = await supabase
            .from('products')
            .select(`
              *,
              hotels (name)
            `)
            .order('quantity', { ascending: true });
          data = inventoryData;
          break;

        case 'revenue':
          const { data: revenueData } = await supabase
            .from('orders')
            .select(`
              *,
              order_items (quantity, price)
            `)
            .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
          data = revenueData;
          break;
      }

      if (data) {
        generatePDF(reportType, data);
      }
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePDF = (type: string, data: any[]) => {
    const doc = new jsPDF();
    const title = `${type.charAt(0).toUpperCase() + type.slice(1)} Report`;
    
    // Add header
    doc.setFontSize(20);
    doc.text(title, 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

    // Add table
    const tableData = formatDataForTable(type, data);
    (doc as any).autoTable({
      head: [tableData.headers],
      body: tableData.rows,
      startY: 40,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [75, 85, 99] }
    });

    // Save PDF
    doc.save(`${type}-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const formatDataForTable = (type: string, data: any[]) => {
    switch (type) {
      case 'sales':
        return {
          headers: ['Order ID', 'Customer', 'Items', 'Total Amount', 'Date'],
          rows: data.map(order => [
            order.id,
            `${order.profiles.first_name} ${order.profiles.last_name}`,
            order.order_items.length,
            `KES ${order.total_amount}`,
            new Date(order.created_at).toLocaleDateString()
          ])
        };

      case 'inventory':
        return {
          headers: ['Product', 'Hotel', 'Quantity', 'Price', 'Category'],
          rows: data.map(product => [
            product.name,
            product.hotels.name,
            product.quantity,
            `KES ${product.price}`,
            product.category
          ])
        };

      case 'revenue':
        return {
          headers: ['Date', 'Orders', 'Total Revenue'],
          rows: data.map(day => [
            new Date(day.created_at).toLocaleDateString(),
            day.order_items.length,
            `KES ${day.order_items.reduce((sum: number, item: any) => 
              sum + (item.quantity * item.price), 0)}`
          ])
        };

      default:
        return { headers: [], rows: [] };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          
          <div className="flex items-center space-x-4">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="sales">Sales Report</option>
              <option value="inventory">Inventory Report</option>
              <option value="revenue">Revenue Report</option>
            </select>

            <button
              onClick={generateReport}
              disabled={isGenerating}
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Printer className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Sales Report</h3>
                <p className="text-sm text-gray-500">Detailed view of all sales and transactions</p>
              </div>
              <button
                onClick={() => {
                  setReportType('sales');
                  generateReport();
                }}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Inventory Report</h3>
                <p className="text-sm text-gray-500">Current stock levels and product status</p>
              </div>
              <button
                onClick={() => {
                  setReportType('inventory');
                  generateReport();
                }}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Revenue Report</h3>
                <p className="text-sm text-gray-500">Financial performance and revenue analysis</p>
              </div>
              <button
                onClick={() => {
                  setReportType('revenue');
                  generateReport();
                }}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}