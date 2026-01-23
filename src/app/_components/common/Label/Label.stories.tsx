// src/components/common/Label/Label.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Common/Label",
  component: Label,
  args: {
    children: "라벨",
    variant: "default",
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "positive", "attention"],
    },
    children: {
      control: "text",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "기본",
  },
};

export const Positive: Story = {
  args: {
    variant: "positive",
    children: "긍정",
  },
};

export const Attention: Story = {
  args: {
    variant: "attention",
    children: "주의",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Label variant="default">기본</Label>
      <Label variant="positive">긍정</Label>
      <Label variant="attention">주의</Label>
    </div>
  ),
};
