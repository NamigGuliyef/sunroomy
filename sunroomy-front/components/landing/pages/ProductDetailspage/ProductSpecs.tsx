"use client";
import React, { useState } from "react";
import Button from "@/components/landing/Common/Button";
import Section from "@/components/landing/UI/Section";
import { ISubProduct } from "@/types/types";

function ProductSpecs({ product }: { product: ISubProduct }) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  return (
    <Section className="md:container md:px-6 lg:px-0">
      <div className="md:border-t border-[#BABABA] pt-8">
        <div className="flex flex-col">
          <div className="mx-6 flex items-center justify-between md:mx-0">
            <h1 className="!font-sf text-3.2xl font-medium text-black md:text-5xl">
              Specifications
            </h1>
            <div
              className={`cursor-pointer transition-all duration-500 ${
                isAccordionOpen ? "rotate-0" : "rotate-180"
              }`}
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
              >
                <path
                  d="M13 7L7 1L1 7"
                  stroke="#717786"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="pt-12 md:pt-14">
            <div
              className={`grid grid-rows-1 overflow-hidden text-sm font-medium transition-[grid-template-rows] duration-500 ease-in-out md:text-lg md:leading-8 ${
                isAccordionOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="flex flex-col justify-center overflow-hidden">
                {product.specifications.map((spec, idx) => (
                  <div
                    key={spec._id}
                    className={`flex ${
                      idx % 2 === 0 ? "bg-[#F0F2F3]" : ""
                    } row-item`}
                  >
                    <div
                      className="flex w-6/12 items-center px-4 py-3 font-light text-[#717786] md:w-4/12"
                      id="inner"
                    >
                      {spec.key}
                    </div>
                    <div
                      className="flex h-full w-6/12 items-center px-4 py-3 text-black md:w-8/12"
                      id="inner"
                    >
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex mt-12 px-6">
            <Button
              to="#"
              className="w-full px-6 py-5 font-sf font-medium text-darkgray"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default ProductSpecs;
