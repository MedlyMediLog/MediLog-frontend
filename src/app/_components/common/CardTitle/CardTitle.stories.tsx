import type { Meta, StoryObj } from "@storybook/react";
import comment_24 from "@/assets/comment_24.svg"
import comment_20 from "@/assets/comment_20.svg"
import see_more_20 from "@/assets/see_more_20.svg"
import see_more_24 from "@/assets/see_more_24.svg"
import Image from "next/image";
import CardTitle from "./CardTitle";

const meta: Meta<typeof CardTitle> = {
  title: "Common/cardTitle",
  component: CardTitle,
  args: {
    title: "안전하게 섭취하려면?",
  },
};
export default meta;

type Story = StoryObj<typeof CardTitle>;

export const Default: Story = {
  args: {
    icon: (
      <>
        <Image src={comment_20} width={20} height={20} alt="comment" className="desktop:hidden block"/>
        <Image src={comment_24} width={24} height={24} alt="comment" className="desktop:block hidden"/>
      </>
    ),
    right: (
      <>
        <Image src={see_more_20} width={20} height={20} alt="see" className="desktop:hidden block"/>
        <Image src={see_more_24} width={24} height={24} alt="see" className="desktop:block hidden"/>
      </>
    ),
  },
};
