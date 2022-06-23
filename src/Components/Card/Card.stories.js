import { Card } from "./index.js";
import "./index.css";

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Card',
  component: Card,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Card {...args} />;

export const FirstStory = {
  args: {
    //👇 The args you need here will depend on your component
  },
};
export const SecondStory = {
    args:{
        username:"Victor",
        status: "online",
        picture: "https://lh3.googleusercontent.com/a-/AOh14GgpEaXQWPhhBWR5BjIYejqR_ub9Qmo64DZY4725uw=s96-c"

    }
}