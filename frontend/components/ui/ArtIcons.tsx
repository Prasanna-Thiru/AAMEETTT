import type { IconType } from "react-icons";
import { FaBullseye, FaEye, FaHandsHelping } from "react-icons/fa";

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
  <ValueBadge
    Icon={FaBullseye}
    accent="text-brand-green"
    background="bg-[#eef8f3]"
    ring="border-brand-green/15"
  />
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
