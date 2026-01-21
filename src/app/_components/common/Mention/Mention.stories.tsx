import type { Meta, StoryObj } from "@storybook/react";
import Mention from "./Mention";
import profile from "@/assets/profile.png";

const meta: Meta<typeof Mention> = {
  title: "Components/Mention",
  component: Mention,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [{ name: "light", value: "#edf2f6" }],
    },
  },
  argTypes: {
    text: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Mention>;

export const Default: Story = {
  args: {
    avatarSrc: profile,
    text: "어쩌고 저쩌고 할 때 먹어요. 어쩌고 저쩌고 할 때 먹어요.",
  },
};

export const LongText: Story = {
  args: {
    avatarSrc: profile,
    text:
      "식후에 물과 함께 섭취해요. 위가 예민하면 공복은 피하고, 카페인과 같이 먹는 건 피하는 게 좋아요. " +
      "특이 체질이면 처음엔 소량으로 시작해요.",
  },
};
