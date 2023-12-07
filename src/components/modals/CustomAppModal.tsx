import Image from "next/image";
import React, {Fragment} from "react";

interface CustomAppModalProps {
  isVisible: boolean;
  headingText: string;
  descriptionText: string | null;
  positiveButtonText: string;
  negativeButtonText: string;
  imageUrl: string;

  onNegativeButtonClicked(): void;

  onPositiveButtonClicked(): void;
}

const CustomAppModal: React.FC<CustomAppModalProps> = ({
  isVisible,
  imageUrl,
  headingText,
  descriptionText,
  positiveButtonText,
  negativeButtonText,
  onPositiveButtonClicked,
  onNegativeButtonClicked,
}) => {
  if (!isVisible) return null;

  return (
    <Fragment>
      <div className="fixed inset-0 backdrop-blur-md bg-opacity-25 flex justify-center items-center">
        <div className="bg-white items-center px-5 md:p-10 rounded-md w-full md:max-w-[500px] lg:max-w-[500px]">
          {/*Form components*/}
          <div className="mt-5 md:mt-7">
            <div className="flex flex-col items-center">
              <Image
                unoptimized={true}
                width={144}
                height={144}
                src={imageUrl}
                alt=""
                className="w-36 h-auto md:w-40 -ml-5"
              />
              <h2 className="text-xl mt-4 text-center md:text-2xl lg:text-3xl">
                {headingText}
              </h2>
              {descriptionText === null ? null : (
                <p className="max-w-md text-center mt-2 text-inactive">
                  {descriptionText}
                </p>
              )}
            </div>
            <div className="flex flex-row gap-4 mt-10">
              <button
                className="secondary-button w-1/3"
                onClick={() => onNegativeButtonClicked()}
              >
                {negativeButtonText}
              </button>
              <button
                className="primary-button w-2/3"
                onClick={() => {
                  onPositiveButtonClicked();
                }}
              >
                {positiveButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CustomAppModal
