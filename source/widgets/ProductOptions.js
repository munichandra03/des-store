import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
//  import { RadioGroup} from '../components'
import { LcsLinkBtn } from "@/widgets/LcsLinkBtn";
import { LcsContent } from "@/widgets/LcsContent";
import LcsRadioGroup from "@/widgets/LcsRadioGroup";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const reviews = { href: "#", average: 4, totalCount: 117 };

export default function ProductOptions({ uiconfig, content }) {
  const [selectedColor, setSelectedColor] = useState(content.colors[0]);
  const [selectedSize, setSelectedSize] = useState(content.sizes[2]);
  return (
    <>
      {/* Options */}
      <div className={uiconfig.cart.space}>
        <LcsContent uiconfig={uiconfig.cart.priceTxt} content={content.price} />

        {/* Reviews */}
        <div className={uiconfig.info.mt6}>
          <h3 className={uiconfig.cart.review}>{content.subHeader[0]}</h3>
          <div className={uiconfig.cart.ratingPos}>
            <div className={uiconfig.cart.ratingPos}>
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={classNames(
                    reviews.average > rating
                      ? "text-gray-900"
                      : "text-gray-200",
                    "h-5 w-5 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>

            <LcsContent
              uiconfig={uiconfig.cart.review}
              content={reviews.average}
            >
              out of 5 stars
            </LcsContent>

            <LcsLinkBtn
              href={reviews.href}
              content={reviews.totalCount}
              className={uiconfig.cart.reviewTxt}
            >
              reviews
            </LcsLinkBtn>
          </div>
        </div>

        <form className={uiconfig.info.mt10}>
          {/* Colors */}
          <div>
            {/* <h3 className={uiconfig.info.uiSubheader}>{content.subHeader[1]}</h3> */}

            {/* <RadioGroup value={selectedColor} onChange={setSelectedColor} className={uiconfig.info.m4}>
                            <RadioGroup.Label className={uiconfig.cart.sr}> Choose a color </RadioGroup.Label>
                            <div className={uiconfig.radio.position}>
                                {content.colors.map((color) => (
                                    <RadioGroup.Option
                                        key={color.name}
                                        value={color.name}
                                        
                                        className={({ active, checked }) =>
                                            classNames(
                                                color.selectedClass,
                                                active && checked ? 'ring ring-offset-1 ' : '',
                                                !active && checked ? 'ring-2' : '',
                                                '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center bg-gray-900 cursor-pointer focus:outline-none'
                                            )
                                        }
                                    >
                                        <RadioGroup.Label as="span" className={uiconfig.cart.sr}>
                                            {' '}
                                            {color.name}{' '}
                                        </RadioGroup.Label>
                                        <span
                                            aria-hidden="true"
                                            className={classNames(
                                                color.class,
                                                'h-8 w-8 border bg-gray-900 border-black border-opacity-10 rounded-full'
                                            )}
                                        />
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup> */}
          </div>
          Sizes
          <LcsRadioGroup />
          <div className={uiconfig.info.mt10}>
            <div className={uiconfig.size.position}>
              <h3 className={uiconfig.info.uiSubheader}>
                {content.subHeader[2]}
              </h3>
              <LcsLinkBtn
                href={content.sizeHeader}
                className={uiconfig.size.txt}
                content={content.subHeader[3]}
              />
            </div>

            {/* <RadioGroup value={selectedSize} onChange={setSelectedSize} className={uiconfig.info.mt4}>
                            <RadioGroup.Label className={uiconfig.cart.sr}> Choose a size </RadioGroup.Label>
                            <div className={uiconfig.radio.bggrid}>
                                {content.sizes.map((size) => (
                                    <RadioGroup.Option
                                        key={size.name}
                                        value={size}
                                        disabled={!size.inStock}
                                        className={({active}) =>
                                            classNames(
                                                size.inStock
                                                    ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                                    : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                                active ? 'ring-2 ring-indigo-500' : '',
                                                'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                            )
                                        }
                                    >
                                        {({active, checked}) => (
                                            <>
                                                <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                {size.inStock ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'border' : 'border-2',
                                                            checked ? 'border-indigo-500' : 'border-transparent',
                                                            'pointer-events-none absolute -inset-px rounded-md'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <span
                                                        aria-hidden="true"
                                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                    >
                                                        <svg
                                                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                            viewBox="0 0 100 100"
                                                            preserveAspectRatio="none"
                                                            stroke="currentColor"
                                                        >
                                                            <line x1={0} y1={100} x2={100} y2={0}
                                                                  vectorEffect="non-scaling-stroke"/>
                                                        </svg>
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup> */}
          </div>
          <button type="submit" className={uiconfig.button}>
            {content.subHeader[4]}
          </button>
        </form>
      </div>
    </>
  );
}
