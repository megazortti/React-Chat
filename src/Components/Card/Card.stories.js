import { Card } from "./index.js";
import "./index.css";

//๐ This default export determines where your story goes in the story list
export default {
  title: 'Card',
  component: Card,
};

//๐ We create a โtemplateโ of how args map to rendering
const Template = (args) => <Card {...args} />;

export const FirstStory = {
  args: {
    //๐ The args you need here will depend on your component
  },
};
export const SecondStory = {
    args:{
        username:"Victor",
        status: "online",
        picture: "https://lh3.googleusercontent.com/a-/AOh14GgpEaXQWPhhBWR5BjIYejqR_ub9Qmo64DZY4725uw=s96-c"

    }
}