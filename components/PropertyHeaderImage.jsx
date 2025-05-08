import Image from 'next/image';

const PropertyHeaderImage = ({ image }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            // src="images/properties/a1.jpg"
            // src={`/images/properties/${image}`}
            src={image}
            className="object-cover h-[400px] w-full" // "width", "height", "sizes" e "priority" com esses valores e o "w-full" daqui consertam o erro "missing required "height" property" dentre outro warning
            width={0}
            height={0}
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
