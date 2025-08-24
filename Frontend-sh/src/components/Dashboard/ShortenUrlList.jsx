import ShortenItem from './ShortenItem'

const ShortenUrlList = ({ data }) => {
  return (
    <div className='space-y-4'>
        {data.map((item) => (
            <ShortenItem key={item.id} {...item} />
        ))}
    </div>
  )
}

export default ShortenUrlList