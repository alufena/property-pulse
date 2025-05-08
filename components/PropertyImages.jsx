import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';

const PropertyImages = ({ images }) => {
  return (
    <Gallery>
      <section className="bg-blue-50 p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item // parte da configuração "photoswipe" e "react-photoswipe-gallery". assim como a tag "Gallery" mais acima
              original={images[0]}
              thumbnail={images[0]}
              width="1000"
              height="600"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open} // abre o lightbox
                  src={images[0]}
                  className="object-cover h-[400px] mx-auto rounded-xl cursor-pointer"
                  width={1800}
                  height={400}
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`
                    ${
                      images.length === 3 && index === 2
                        ? 'col-span-2'
                        : 'col-span-1'
                    }
                    `}
                >
                  <Item
                    original={image}
                    thumbnail={image}
                    width="1000"
                    height="600"
                  >
                    {({ ref, open }) => (
                      <Image
                        src={image} // ao invés de ser a 1ª imagem, será a imagem atual da iteração map
                        className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                        width={0}
                        height={0}
                        priority={true}
                        sizes="100vw"
                        ref={ref}
                        onClick={open}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
