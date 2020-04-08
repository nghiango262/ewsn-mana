const categories = [
    {
        id: 'plants',
        name: "Plants",
        tags: ["products", "inspiration"],
        count: 147,
        image: null
    },
    {
        id: 'seeds',
        name: "Plants",
        tags: ["products", "shop"],
        count: 147,
        image: null
    },
    {
        id: 'flowers',
        name: "Flowers",
        tags: ["products", "inspiration"],
        count: 68,
        image: null
    },
    {
        id: "sprayers",
        name: "Sprayers",
        tags: ["products", "inspiration", "shop"],
        count: 17,
        image: null
    },
    {
        id: "pots",
        name: "Pots",
        tags: ["products", "shop"],
        count: 47,
        image: null
    },
    {
        id: "fertilizers",
        name: "Fertilizers",
        tags: ["products", "shop"],
        count: 47,
        image: null
    },
]

const products = [
    {
        id: 1,
        name: "16 Best Plants That thrive In Your Bedroom",
        description: "sjfskjfklslkfskdfjksjdfksj",
        tags: ["Interior", "27m", "Ideas"],
        gallery: [
            require("../assets/images/plants_1.png"),
            require("../assets/images/plants_2.png"),
            require("../assets/images/plants_3.png"),

            require("../assets/images/plants_1.png"),
            require("../assets/images/plants_2.png"),
            require("../assets/images/plants_3.png"),
        ]
    }
];

const profile = {
    username: "admin",
    location: "Vietnam",
    email: "contact@ewsn.vn",
    avatar: require("../assets/images/avatar.png"),
    budget: 1000,
    monthly_cap: 5000,
    notifications: true,
    newsletter: false

};

const explore = [
    //images
    require("../assets/images/explore_1.png"),
    require("../assets/images/explore_2.png"),
    require("../assets/images/explore_3.png"),
    require("../assets/images/explore_4.png"),
    require("../assets/images/explore_5.png"),
    require("../assets/images/explore_6.png"),
];

export {
    categories,
    products,
    explore,
    profile
};