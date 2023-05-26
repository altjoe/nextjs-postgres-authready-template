module.exports = {
    stories: [
        "../src/**/*.stories.js",
        "../components/**/*.stories.js",
        "../layouts/**/*.stories.js",
        "../pages/**/*.stories.js",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-postcss",
    ],
    framework: "@storybook/react",
    core: {
        builder: "@storybook/builder-webpack5",
    },
};
