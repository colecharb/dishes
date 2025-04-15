type IngredientEntry = {
  amount: string;
  ingredient: string;
};
type Step = string;

type RecipeBase = {
  id: string;
  name: string;
  ingredients: IngredientEntry[];
  method: Step[];
};

// Recipe sa parsed from AsyncStorage
type RecipeRaw = RecipeBase & {
  createdAt: string;
  modifiedAt: string;
};

type Recipe = RecipeBase & {
  createdAt: Date;
  modifiedAt: Date;
};

const NEW_RECIPE_ID = 'NEW RECIPE';

const RECIPES: Recipe[] = [
  {
    id: 'a',
    name: 'Pasta e Fagioli',
    ingredients: [
      { amount: '2 cans', ingredient: 'cannellini beans' },
      { amount: 'several', ingredient: 'cloves garlic' },
      { amount: 'lots', ingredient: 'olive oil' },
      { amount: 'some', ingredient: 'canned tomato, maybe 1/4 cup' },
      { amount: '1/2 box', ingredient: 'ditalini' },
    ],
    method: [
      'Saute garlic in oil.',
      'Puree 1/2 of the beans with the tomato.',
      'Add puree and rest of the whole beans to the pot.',
      'Simmer for 30 mins or so.',
      'Cook pasta al dente and add to the soup.',
    ],
    createdAt: new Date('2023-01-01T10:00:00Z'),
    modifiedAt: new Date('2023-01-02T12:00:00Z'),
  },
  {
    id: 'b',
    name: 'Pad Kee Mao',
    ingredients: [
      { amount: '8 oz', ingredient: 'wide rice noodles' },
      { amount: '2 tbsp', ingredient: 'vegetable oil' },
      { amount: '3 cloves', ingredient: 'garlic, minced' },
      { amount: '1-2', ingredient: "bird's eye chilies, chopped" },
      { amount: '1/4 cup', ingredient: 'oyster sauce' },
      { amount: '2 tbsp', ingredient: 'soy sauce' },
      { amount: '1 tbsp', ingredient: 'fish sauce' },
      { amount: '1 tbsp', ingredient: 'sugar' },
      { amount: '1/4 cup', ingredient: 'Thai basil leaves' },
      { amount: '1/2 cup', ingredient: 'sliced bell peppers' },
      { amount: '1/2 cup', ingredient: 'sliced onion' },
    ],
    method: [
      'Soak rice noodles in warm water until soft, then drain.',
      'Heat oil in a wok over high heat.',
      'Add garlic and chilies, stir-fry for 30 seconds.',
      'Add onions and bell peppers, stir-fry until slightly softened.',
      'Add noodles and sauces (oyster, soy, fish, sugar), toss to coat evenly.',
      'Add Thai basil leaves, stir-fry until wilted.',
      'Serve hot.',
    ],
    createdAt: new Date('2023-02-01T09:00:00Z'),
    modifiedAt: new Date('2023-02-01T10:30:00Z'),
  },
  {
    id: 'c',
    name: "Penne all'Arrabbiata",
    ingredients: [
      { amount: '1 lb', ingredient: 'penne pasta' },
      { amount: '3 tbsp', ingredient: 'olive oil' },
      { amount: '4 cloves', ingredient: 'garlic, thinly sliced' },
      { amount: '1/2 tsp', ingredient: 'red chili flakes (adjust to taste)' },
      { amount: '1 can (14 oz)', ingredient: 'crushed tomatoes' },
      { amount: 'to taste', ingredient: 'salt' },
      { amount: 'optional', ingredient: 'fresh parsley, chopped' },
      { amount: 'optional', ingredient: 'freshly grated Parmesan cheese' },
    ],
    method: [
      'Cook penne in a large pot of salted boiling water until al dente, then drain.',
      'Heat olive oil in a skillet over medium heat.',
      'Add garlic and chili flakes, sauté until fragrant.',
      'Stir in crushed tomatoes, season with salt, and simmer for 15 minutes.',
      'Add cooked pasta to the sauce, toss to coat.',
      'Garnish with parsley and Parmesan, if desired.',
      'Serve immediately.',
    ],
    createdAt: new Date('2023-03-01T08:00:00Z'),
    modifiedAt: new Date('2023-03-02T08:30:00Z'),
  },
  {
    id: 'd',
    name: 'Classic Margherita Pizza',
    ingredients: [
      { amount: '1 ball', ingredient: 'pizza dough' },
      { amount: '1/2 cup', ingredient: 'marinara sauce' },
      { amount: '4 oz', ingredient: 'fresh mozzarella, sliced' },
      { amount: '2-3', ingredient: 'fresh basil leaves' },
      { amount: '1 tbsp', ingredient: 'olive oil' },
    ],
    method: [
      'Preheat oven to 475°F (245°C).',
      'Roll out pizza dough on a floured surface.',
      'Spread marinara sauce evenly over the dough.',
      'Top with fresh mozzarella slices.',
      'Bake for 10-12 minutes until crust is golden and cheese is bubbling.',
      'Remove from oven and top with fresh basil leaves and a drizzle of olive oil.',
      'Slice and serve hot.',
    ],
    createdAt: new Date('2023-04-01T07:00:00Z'),
    modifiedAt: new Date('2023-04-01T09:00:00Z'),
  },
  {
    id: 'e',
    name: 'Chicken Tikka Masala',
    ingredients: [
      {
        amount: '1 lb',
        ingredient: 'chicken thighs, cut into bite-sized pieces',
      },
      { amount: '1 cup', ingredient: 'plain yogurt' },
      { amount: '2 tbsp', ingredient: 'tikka masala spice mix' },
      { amount: '2 tbsp', ingredient: 'vegetable oil' },
      { amount: '1 large', ingredient: 'onion, finely chopped' },
      { amount: '3 cloves', ingredient: 'garlic, minced' },
      { amount: '1-inch piece', ingredient: 'ginger, grated' },
      { amount: '1 can (14 oz)', ingredient: 'tomato puree' },
      { amount: '1 cup', ingredient: 'heavy cream' },
      { amount: 'to taste', ingredient: 'salt' },
      { amount: 'for garnish', ingredient: 'fresh cilantro, chopped' },
    ],
    method: [
      'Marinate chicken in yogurt and tikka masala spice mix for at least 1 hour.',
      'Heat oil in a skillet over medium heat.',
      'Cook marinated chicken until browned and cooked through, then set aside.',
      'In the same skillet, sauté onions, garlic, and ginger until softened.',
      'Add tomato puree and simmer for 10 minutes.',
      'Stir in heavy cream and cooked chicken, simmer for another 5 minutes.',
      'Season with salt and garnish with fresh cilantro before serving.',
    ],
    createdAt: new Date('2023-05-01T06:00:00Z'),
    modifiedAt: new Date('2023-05-01T07:30:00Z'),
  },
  {
    id: 'f',
    name: 'Shakshuka',
    ingredients: [
      { amount: '2 tbsp', ingredient: 'olive oil' },
      { amount: '1', ingredient: 'onion, finely chopped' },
      { amount: '1', ingredient: 'red bell pepper, diced' },
      { amount: '3 cloves', ingredient: 'garlic, minced' },
      { amount: '1 tsp', ingredient: 'ground cumin' },
      { amount: '1 tsp', ingredient: 'smoked paprika' },
      { amount: '1/4 tsp', ingredient: 'cayenne pepper' },
      { amount: '1 can (14 oz)', ingredient: 'diced tomatoes' },
      { amount: '4', ingredient: 'large eggs' },
      { amount: 'to taste', ingredient: 'salt and pepper' },
      { amount: 'for garnish', ingredient: 'fresh parsley, chopped' },
      { amount: 'for serving', ingredient: 'crusty bread' },
    ],
    method: [
      'Heat olive oil in a skillet over medium heat.',
      'Sauté onion and bell pepper until softened.',
      'Add garlic, cumin, smoked paprika, and cayenne, cook for 1 minute.',
      'Stir in diced tomatoes, season with salt and pepper, and simmer for 10 minutes.',
      'Make small wells in the sauce and crack eggs into the wells.',
      'Cover and cook until egg whites are set but yolks are still runny.',
      'Garnish with parsley and serve with crusty bread.',
    ],
    createdAt: new Date('2023-06-01T05:00:00Z'),
    modifiedAt: new Date('2023-06-01T06:00:00Z'),
  },
  {
    id: 'g',
    name: 'Guacamole',
    ingredients: [
      { amount: '3', ingredient: 'ripe avocados' },
      { amount: '1', ingredient: 'lime, juiced' },
      { amount: '1/2 tsp', ingredient: 'salt' },
      { amount: '1/2 cup', ingredient: 'diced red onion' },
      { amount: '2', ingredient: 'Roma tomatoes, diced' },
      { amount: '1', ingredient: 'jalapeño, seeded and finely chopped' },
      { amount: '2 tbsp', ingredient: 'fresh cilantro, chopped' },
    ],
    method: [
      'Mash avocados in a bowl.',
      'Stir in lime juice and salt.',
      'Mix in red onion, tomatoes, jalapeño, and cilantro.',
      'Taste and adjust seasoning as needed.',
      'Serve immediately with tortilla chips or as a topping.',
    ],
    createdAt: new Date('2023-07-01T04:00:00Z'),
    modifiedAt: new Date('2023-07-01T05:00:00Z'),
  },
  {
    id: 'h',
    name: 'Vegetable Stir-Fry',
    ingredients: [
      { amount: '2 tbsp', ingredient: 'vegetable oil' },
      { amount: '1', ingredient: 'red bell pepper, sliced' },
      { amount: '1', ingredient: 'yellow bell pepper, sliced' },
      { amount: '1', ingredient: 'zucchini, sliced' },
      { amount: '1 cup', ingredient: 'broccoli florets' },
      { amount: '2 cloves', ingredient: 'garlic, minced' },
      { amount: '1 tbsp', ingredient: 'soy sauce' },
      { amount: '1 tbsp', ingredient: 'oyster sauce' },
      { amount: '1 tsp', ingredient: 'sesame oil' },
      {
        amount: 'optional',
        ingredient: '1 tsp cornstarch mixed with 2 tbsp water',
      },
    ],
    method: [
      'Heat vegetable oil in a large skillet or wok over high heat.',
      'Add garlic and stir-fry for 30 seconds until fragrant.',
      'Add bell peppers, zucchini, and broccoli, stir-fry for 3-5 minutes.',
      'Add soy sauce, oyster sauce, and sesame oil, tossing to coat the vegetables.',
      'If desired, add cornstarch slurry and cook for another 1-2 minutes until sauce thickens.',
      'Serve immediately over steamed rice or noodles.',
    ],
    createdAt: new Date('2023-08-01T03:00:00Z'),
    modifiedAt: new Date('2023-08-01T04:30:00Z'),
  },
  {
    id: 'i',
    name: 'Chocolate Chip Pancakes',
    ingredients: [
      { amount: '1 cup', ingredient: 'all-purpose flour' },
      { amount: '2 tbsp', ingredient: 'sugar' },
      { amount: '1 tsp', ingredient: 'baking powder' },
      { amount: '1/2 tsp', ingredient: 'baking soda' },
      { amount: '1/4 tsp', ingredient: 'salt' },
      { amount: '1 cup', ingredient: 'buttermilk' },
      { amount: '1', ingredient: 'large egg' },
      { amount: '2 tbsp', ingredient: 'melted butter' },
      { amount: '1/2 cup', ingredient: 'chocolate chips' },
      { amount: 'for cooking', ingredient: 'butter or oil' },
      { amount: 'for serving', ingredient: 'maple syrup' },
    ],
    method: [
      'In a large bowl, whisk together flour, sugar, baking powder, baking soda, and salt.',
      'In a separate bowl, whisk buttermilk, egg, and melted butter.',
      'Pour the wet ingredients into the dry ingredients and stir until just combined.',
      'Fold in chocolate chips.',
      'Heat a non-stick skillet over medium heat and grease lightly with butter or oil.',
      'Pour 1/4 cup batter onto the skillet and cook until bubbles form, about 2 minutes.',
      'Flip and cook the other side for 1-2 minutes until golden brown.',
      'Serve with maple syrup.',
    ],
    createdAt: new Date('2023-09-01T02:00:00Z'),
    modifiedAt: new Date('2023-09-01T03:00:00Z'),
  },
  {
    id: 'j',
    name: 'Classic Caprese Salad',
    ingredients: [
      { amount: '3', ingredient: 'ripe tomatoes, sliced' },
      { amount: '8 oz', ingredient: 'fresh mozzarella, sliced' },
      { amount: '1/4 cup', ingredient: 'fresh basil leaves' },
      { amount: '2 tbsp', ingredient: 'extra virgin olive oil' },
      { amount: '1 tbsp', ingredient: 'balsamic vinegar' },
      {
        amount: 'to taste',
        ingredient: 'salt and freshly ground black pepper',
      },
    ],
    method: [
      'Arrange alternating slices of tomato and mozzarella on a plate.',
      'Tuck basil leaves between the slices.',
      'Drizzle with olive oil and balsamic vinegar.',
      'Season with salt and pepper.',
      'Serve immediately as a refreshing appetizer or side dish.',
    ],
    createdAt: new Date('2023-10-01T01:00:00Z'),
    modifiedAt: new Date('2023-10-01T02:00:00Z'),
  },
  {
    id: 'k',
    name: 'Garlic Butter Shrimp',
    ingredients: [
      { amount: '1 lb', ingredient: 'large shrimp, peeled and deveined' },
      { amount: '2 tbsp', ingredient: 'olive oil' },
      { amount: '3 cloves', ingredient: 'garlic, minced' },
      { amount: '3 tbsp', ingredient: 'unsalted butter' },
      { amount: '1/4 cup', ingredient: 'fresh parsley, chopped' },
      { amount: 'juice of 1', ingredient: 'lemon' },
      { amount: 'to taste', ingredient: 'salt and pepper' },
    ],
    method: [
      'Heat olive oil in a large skillet over medium heat.',
      'Add shrimp, season with salt and pepper, and cook for 2-3 minutes per side until pink and opaque.',
      'Remove shrimp from the skillet and set aside.',
      'In the same skillet, melt butter and sauté garlic until fragrant, about 1 minute.',
      'Stir in lemon juice and parsley.',
      'Return shrimp to the skillet and toss to coat in the garlic butter.',
      'Serve immediately with crusty bread or over rice.',
    ],
    createdAt: new Date('2023-11-01T00:00:00Z'),
    modifiedAt: new Date('2023-11-01T01:00:00Z'),
  },
  {
    id: 'l',
    name: 'Mango Lassi',
    ingredients: [
      { amount: '1 cup', ingredient: 'ripe mango chunks' },
      { amount: '1/2 cup', ingredient: 'plain yogurt' },
      { amount: '1/2 cup', ingredient: 'milk' },
      { amount: '2 tbsp', ingredient: 'sugar (or to taste)' },
      { amount: '1/4 tsp', ingredient: 'cardamom powder' },
      { amount: 'optional', ingredient: 'ice cubes' },
    ],
    method: [
      'Blend mango chunks, yogurt, milk, sugar, and cardamom powder in a blender until smooth.',
      'Add ice cubes if desired and blend again.',
      'Pour into glasses and serve chilled.',
    ],
    createdAt: new Date('2023-12-01T23:00:00Z'),
    modifiedAt: new Date('2023-12-02T00:00:00Z'),
  },
  {
    id: 'm',
    name: 'Baked Salmon with Dill',
    ingredients: [
      { amount: '4', ingredient: 'salmon fillets' },
      { amount: '2 tbsp', ingredient: 'olive oil' },
      { amount: '1', ingredient: 'lemon, sliced' },
      { amount: '2 tbsp', ingredient: 'fresh dill, chopped' },
      { amount: 'to taste', ingredient: 'salt and pepper' },
    ],
    method: [
      'Preheat oven to 375°F (190°C).',
      'Place salmon fillets on a baking sheet lined with parchment paper.',
      'Drizzle with olive oil and season with salt and pepper.',
      'Top each fillet with a slice of lemon and sprinkle with dill.',
      'Bake for 12-15 minutes or until salmon flakes easily with a fork.',
      'Serve hot with your favorite side dish.',
    ],
    createdAt: new Date('2023-12-31T22:00:00Z'),
    modifiedAt: new Date('2024-01-01T00:00:00Z'),
  },
];

export type { IngredientEntry, Step, RecipeRaw, Recipe };
export { RECIPES, NEW_RECIPE_ID };
