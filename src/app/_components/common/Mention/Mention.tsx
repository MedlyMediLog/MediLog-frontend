import Image, { StaticImageData } from "next/image";

type MentionProps = {
  text: string;
  avatarSrc: StaticImageData;
  className?: string;
};

export default function Mention({ text, avatarSrc, className }: MentionProps) {
  return (
    <div className={`flex gap-[12px] items-center desktop:w-[572px] ${className ?? ""}`}>
      <div className="w-[40px] h-[40px] relative shrink-0">
        <Image src={avatarSrc} fill className="object-contain" alt="profile" />
      </div>

      <div className="max-w-[420px] relative flex flex-col rounded-[12px] gap-[16px] pt-[6px] px-[16px] pb-[7px] bg-[#dce4ed] shadow-[0_0_16px_rgba(76,75,88,0.08)]">
        {/* 말풍선 꼬리 */}
        <div
          className="
            absolute left-[-6px] top-[12px]
            h-0
            border-t-[6px] border-b-[6px] border-r-[6px]
            border-t-transparent border-b-transparent border-r-[#dce4ed]
          "
        />

        <div className="typo-b3 text-[#454f5b]">{text}</div>
      </div>
    </div>
  );
}
