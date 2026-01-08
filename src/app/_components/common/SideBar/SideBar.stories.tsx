import type { Meta, StoryObj } from "@storybook/react";
import SideBar from "./SideBar";

const meta: Meta<typeof SideBar> = {
  title: "Layout/SideBar",
  component: SideBar,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof SideBar>;

export const Default: Story = {
  render: () => (
    <div className="h-screen">
      <SideBar />
    </div>
  ),
};
