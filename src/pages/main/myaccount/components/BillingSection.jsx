import React from 'react'
import { CreditCard, Download, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const BillingSection = ({ invoices }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Billing History</h2>
      
      {/* Current Subscription */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Pro Monthly</h3>
            <p className="text-gray-600">Next Payment: September 1, 2024</p>
            <p className="text-gray-600">Amount: $29.99/month</p>
          </div>
          <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-100">
            <CreditCard className="w-4 h-4 mr-2" />
            Update Payment Method
          </Button>
        </div>
      </Card>

      {/* Invoice Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Invoices</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Invoice #</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Plan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Payment Method</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">{invoice.date}</td>
                  <td className="py-3 px-4 text-gray-700">{invoice.invoiceNumber}</td>
                  <td className="py-3 px-4 text-gray-700">{invoice.plan}</td>
                  <td className="py-3 px-4 text-gray-700">{invoice.paymentMethod}</td>
                  <td className="py-3 px-4 text-gray-700">{invoice.amount}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex gap-3 mt-6">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Manage Subscription
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download All Invoices (ZIP)
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default BillingSection
