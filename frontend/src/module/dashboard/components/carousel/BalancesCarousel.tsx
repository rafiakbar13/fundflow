import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton.tsx";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons.tsx";
import useEmblaCarousel from "embla-carousel-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { toRupiah } from "@/lib/utils.ts";

interface Accounts {
  id: string;
  bankName: string;
  type: string;
  balance: number;
  accountNumber: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  data: Accounts[];
};

const BalancesCarousel: React.FC<PropType> = (props) => {
  const { slides, options, data } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {data && data.length > 0 ? (
            data.map((account, index) => (
              <div className="embla__slide" key={index}>
                <Card className="w-full bg-white border-none shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between pb-4 border-b-[1px] border-slate-200">
                      <p className="text-sm font-bold">
                        {toRupiah(account.balance)}
                      </p>
                      <p className="text-sm text-gray-600">All Account</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <article className="px-4 space-y-4">
                      <div className="space-y-1">
                        <span className="text-lg font-semibold">
                          {account.accountNumber}
                        </span>
                        <p className="text-sm text-gray-400">Account Number</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-lg font-semibold">
                          {toRupiah(account.balance)}
                        </span>
                        <p className="text-sm text-gray-400">Total Amount</p>
                      </div>
                    </article>
                  </CardContent>
                  <CardFooter className="flex justify-between gap-x-16">
                    <Button variant={"link"} className="text-primary">
                      Remove
                    </Button>
                    <Button>Details</Button>
                  </CardFooter>
                </Card>
              </div>
            ))
          ) : (
            <p>No accounts available.</p>
          )}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index: number) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BalancesCarousel;
