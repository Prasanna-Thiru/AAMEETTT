import type { IconType } from "react-icons";
import { FaEye, FaHandsHelping } from "react-icons/fa";

type ValueBadgeProps = {
  Icon: IconType;
  accent: string;
  background: string;
  ring: string;
};

const ValueBadge = ({ Icon, accent, background, ring }: ValueBadgeProps) => (
  <div
    className={`mx-auto flex h-[132px] w-[132px] items-center justify-center rounded-[28px] border ${ring} ${background} shadow-[0_18px_40px_rgba(15,35,52,0.10)] transition-transform duration-300 hover:-translate-y-1 sm:h-[148px] sm:w-[148px]`}
  >
    <div className="flex h-[92px] w-[92px] items-center justify-center rounded-[24px] border border-white/80 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_12px_28px_rgba(15,35,52,0.10)] sm:h-[102px] sm:w-[102px]">
      <Icon className={`text-[2.6rem] sm:text-[3rem] ${accent}`} aria-hidden="true" />
    </div>
  </div>
);

export const MissionIcon = () => (
  <div className="mx-auto flex h-[132px] w-[132px] items-center justify-center rounded-[28px] border border-brand-green/15 bg-[#eef8f3] shadow-[0_18px_40px_rgba(15,35,52,0.10)] transition-transform duration-300 hover:-translate-y-1 sm:h-[148px] sm:w-[148px]">
    <div className="flex h-[92px] w-[92px] items-center justify-center rounded-[24px] border border-white/80 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_12px_28px_rgba(15,35,52,0.10)] sm:h-[102px] sm:w-[102px]">
      <svg
        viewBox="0 0 96 96"
        className="h-[68px] w-[68px] text-brand-green sm:h-[76px] sm:w-[76px]"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M22 65h47c4.4 0 8 3.6 8 8s-3.6 8-8 8H25c-4.4 0-8-3.6-8-8s3.6-8 8-8Z"
          className="fill-current opacity-95"
        />
        <path d="M25 71h45" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <path
          d="M23 49h42c4.4 0 8 3.6 8 8s-3.6 8-8 8H26c-4.4 0-8-3.6-8-8s3.6-8 8-8Z"
          className="fill-current opacity-95"
        />
        <path d="M26 55h38" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <path
          d="M49 49c2.8-18.8 11.5-31.9 27-39.3 2.2 13-1.6 25.4-9.9 34.2-5 5.3-10.9 8.3-17.1 9.1Z"
          className="fill-current"
        />
        <path
          d="M51 48c6-12.9 13.4-22.3 23-30"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path d="M43 58l6-21" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path
          d="M39 43h11c2.2 0 4 1.8 4 4v5H35v-5c0-2.2 1.8-4 4-4Z"
          className="fill-current"
        />
        <path d="M39 49h11" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  </div>
);

export const VisionIcon = () => (
  <ValueBadge
    Icon={FaEye}
    accent="text-brand-blue"
    background="bg-[#eef5ff]"
    ring="border-brand-blue/15"
  />
);

export const ValuesIcon = () => (
  <ValueBadge
    Icon={FaHandsHelping}
    accent="text-brand-gold"
    background="bg-[#fff7e6]"
    ring="border-brand-gold/20"
  />
);
