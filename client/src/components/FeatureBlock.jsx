function FeatureBlock({ title, description, imageSrc, reverse = false }) {
  return (
    <div className={`grid grid-cols-12 gap-4 items-center max-w-6xl mx-auto py-12 ${reverse ? 'flex-row-reverse' : ''}`}>
      <div className="col-span-3">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      <div className="col-span-5">
        <p className="text-lg">{description}</p>
      </div>
      <div className="col-span-4 flex justify-center">
        <img src={imageSrc} alt={title} className="w-full max-w-xs rounded-lg shadow-md" />
      </div>
    </div>
  );
}

export default FeatureBlock;