import { homeAboutSections } from '@/data/home-about'
import { Button } from '@/components/ui/button'

const Block = ({ section }) => {
  const isLeft = section.orientation === 'image-left'
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-10">
      {isLeft && (
        <img src={section.image} alt="" className="w-full h-64 sm:h-72 lg:h-80 object-cover rounded-xl shadow" />
      )}
      <div>
        {section.title && (
          <h3 className="text-2xl font-bold text-gray-900">
            {section.title} {section.highlight && <span className="text-primary">{section.highlight}</span>}
          </h3>
        )}
        {section.subtitle && (
          <p className="text-sm text-gray-700 mb-3">{section.subtitle}</p>
        )}
        {section.description && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {section.description}
          </p>
        )}
        {section.points && (
          <ol className="mt-4 space-y-3 text-sm text-gray-600 list-decimal list-inside">
            {section.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ol>
        )}
        {section.cta && (
          <div className="mt-4">
            <Button className="rounded-full bg-primary hover:bg-primary/90">{section.cta.label}</Button>
          </div>
        )}
      </div>
      {!isLeft && (
        <img src={section.image} alt="" className="w-full h-64 sm:h-72 lg:h-80 object-cover rounded-xl shadow" />
      )}
    </div>
  )
}

const HomeAboutUs = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {homeAboutSections.map((s) => (
          <Block key={s.id} section={s} />
        ))}
      </div>
    </section>
  )
}

export default HomeAboutUs