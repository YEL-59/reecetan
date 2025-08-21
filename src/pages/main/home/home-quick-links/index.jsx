import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

const quickLinks = [
  {
    id: 1,
    title: 'Examination Center Portal',
    description: 'Access your test schedules, results, and examination resources.',
    icon: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=200&auto=format&fit=crop',
    buttonText: 'Open Portal',
    href: '#'
  },
  {
    id: 2,
    title: 'Examination Center Portal',
    description: 'Access your test schedules, results, and examination resources.',
    icon: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=200&auto=format&fit=crop',
    buttonText: 'Open Portal',
    href: '#'
  },
  {
    id: 3,
    title: 'Examination Center Portal',
    description: 'Access your test schedules, results, and examination resources.',
    icon: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=200&auto=format&fit=crop',
    buttonText: 'Open Portal',
    href: '#'
  }
]

const QuickLinkCard = ({ link }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
      {/* Icon */}
      <div className="w-16 h-16 rounded-lg overflow-hidden mb-4">
        <img 
          src={link.icon} 
          alt={link.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {link.title}
      </h3>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        {link.description}
      </p>
      
      {/* Button */}
      <Button 
        className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg"
        onClick={() => window.open(link.href, '_blank')}
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        {link.buttonText}
      </Button>
    </div>
  )
}

const HomeQuickLinks = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Quick <span className="text-primary">Links</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {quickLinks.map((link) => (
            <QuickLinkCard key={link.id} link={link} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeQuickLinks