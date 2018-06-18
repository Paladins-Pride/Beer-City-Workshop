import { AssertAssignable } from "../util";

describe("Primative types", () => {
  test("has type inference", () => {
    /**
     * TypeScript infers the types of variables.
     * Hover over these variable declarations to see them.
     */

    let hello = "hello world";

    let isTypeScriptTime = true;

    let oneAndAHalf = 1.5;

    let arrayOfFruits = ["apple", "orange", "pear"];

    let arrayOfBools = [true, false];
  });

  test("and type annotations", () => {
    /**
     * Rather than letting TS infer the types, we can add
     * type annotations that explicitly describe the variable type.
     */

    let hello: string = "hello world";

    let isTypeScriptTime: boolean = true;

    let oneAndAHalf: number = 1.5;

    let arrayOfFruits: string[] = ["apple", "orange", "pear"];

    let arrayOfBools: boolean[] = [true, false];
  });

  test("types enforce constraints", () => {
    /**
     * Once a variable has a type, the type checker will fail
     * if we try to assign it to a value of a different type.
     */
    let hello: string = "a string";

    // typings:expect-error
    hello = 5;

    /**
     * Type annotations are useful because they allow us to
     * express our intent to TypeScript, so it can catch mistakes.
     */
    // typings:expect-error
    let shouldBeAString: string = true;
  });
});

describe("More types", () => {
  test("function types", () => {
    /**
     * Type annotations get more powerful when we start using 
     * them with functions. Check out the type of declareFavoriteFood.
     */
    function declareFavoriteFood(name: string, food: string) {
      return `${name}'s favorite food is ${food}`;
    }
    type declareFavoriteFoodType = typeof declareFavoriteFood;

    /** TS knows the return type of declareFavoriteFood. */
    let waldosFavorite = declareFavoriteFood("Waldo", "chips");

    /**
     * If we try to pass a value of the wrong type, we'll get an error- 
     * just like we did when assigning a variable to the wrong type.
     */
    // typings:expect-error
    let invalidInput = declareFavoriteFood("Waldo", true);
  });
  test("the 'any' type", () => {
    /** 
     * TS describes types that it can't identify as 'any'. 
     * 
     * In this example, we haven't told TS what the args of this function 
     * should be, so it infers them to be 'any'. Implicit 'any' types
     * aren't allowed for function args, so we get an error:
     */
    // typings:expect-error
    function declareFavoriteFood(name, food) {
      return `${name}'s favorite food is ${food}`;
    }

    /** But it does allow _explicit_ any for function args: */
    function typedDeclareFavoriteFood(name: any, food: any) {
      return `${name}'s favorite food is ${food}`;
    }
    /** 
     * Using 'any' is risky, because it effectively disables 
     * type checking:
     * */
    let thisWillBlowUp = typedDeclareFavoriteFood(1, 2)

    /** We'll come back to 'any' in the next exercise. */
  });

  test("a custom type", () => {
    /**
     * We can declare our own types made up of primitives.
     */
    type MySpecialString = string;

    function sayHello(name: string) {
      console.log(`Hello, ${name}!`);
    }
    /** And we can use them where they're compatible with other types */
    let specialName: MySpecialString = "Dixie the Good";
    sayHello(specialName);

    /** 
     * But, notice that declaring a named type doesn't inherently 
     * change the way the type operates.
     */
    function specialSayHello(name: MySpecialString) {
      console.log(`Hello, ${specialName}, Your Excellence.`);
    }

    let aCommonerName: string = "John";
    specialSayHello(aCommonerName); // No type error
    /** 
     * string and MySpecialString are compatible; we can pass either one 
     * in any place the other is expected.
     */
  });

  test("literal types", () => {
    type ALiteralString = "just this one";

    // typings: expect-error
    let notThatLiteral: ALiteralString = "some other string";
  });

  test("infers different types based on keywords", () => {
    let regularString = "hello";
    if (regularString !== "world") {
      regularString.slice(1);
    }
    
    const literalString = "goodnight";
    /** 
     * Check out the type of literalString! It's a string literal, 
     * which means TS knows it can only be this exact value.
     */
    if (literalString !== "goodnight") {
      // typings: expect-error
      literalString.slice(1);
    }
  });

  test("describes a literal", () => {
    type FixThisType = any;

    let hello: FixThisType = "hello";

    // typings: expect-error
    let world: FixThisType = "world";

    // typings: expect-error
    let goodnight: FixThisType = "goodnight";

    // typings: expect-error
    let moon: FixThisType = "moon";
  });

  test("and more interestingly, we can describe new types by unioning primatives together!", () => {
    type AStringOrANumber = string | number;
    let aString: AStringOrANumber = "hello";
    let aNumber: AStringOrANumber = 2;

    // typings: expect-error
    let aBool: AStringOrANumber = true;
  });

  test("this allows us to constrain types in interesting ways", () => {
    type FixThisType = any;

    let aBool: FixThisType = true;

    let aString: FixThisType = "whatever";

    // typings: expect-error
    let aNull: FixThisType = null;
  });
});

describe("Literal types", () => {
  test("can follow control flow", () => {
    let fruit = "orange";
    // fruit: string
    if (fruit === "orange") {
      // fruit: "orange"
      fruit;
    } else {
      // fruit: string
      fruit;
    }
  });
  test("", () => {
    // Array, of...whatever
    let things = ["apple", 4, true];
    things.push(null); // Oh no! TypeScript has inferred that things can only be of a few types

    let anyThings: any[] = ["apple", 4, true];
    anyThings.push(["hello"]); // If TS isn't quite right about its inference, we can tell it what we meant

    function pickFrutest(fruits: string[]) {
      return fruits[Math.random() * fruits.length];
    }
  });
  test("infers types for normal JS", () => {
    let orange = "orange";
    const apple = "apple";
  });
});

// Here's a function, here are some tests, convert it to ts, make the hate go away
// Using types to guide writing new code
// make this code increasingly typescripty

describe("Object types", () => {
  test("interfaces describe objects", () => {
    interface FoodItem {
      name: string;
      cost: number;
    }

    let muffin: FoodItem = {
      cost: 2,
      name: "Muffin"
    };
  });

  test("structural compatibility", () => {
    // Type annotations are just there to help us describe object shapes
    interface DeliItem {
      name: string;
      cost: number;
    }
    interface BakeryItem {
      name: string;
      cost: number;
    }

    let lunchMeat: DeliItem = {
      name: "Sliced Turkey",
      cost: 3
    };

    let croissant: BakeryItem = {
      name: "Croissant",
      cost: 2
    };

    function bakeryPriceStatement(item: BakeryItem) {
      return `That fresh-baked ${item.name} will be $${item.cost}.`;
    }

    function deliPriceStatement(item: DeliItem) {
      return `That juicy ${item.name} will be $${item.cost}.`;
    }

    // We can substitute one type for another anytime they're structurally compatible
    let freshBakedCheese = bakeryPriceStatement(lunchMeat);
    let juicyCroissant = deliPriceStatement(croissant);

    // Or even anonymous types
    let mysteryMeat = deliPriceStatement({ name: "Mystery Meat", cost: 1 });

    enum Flavor {
      Sweet = "sweet",
      Sour = "sour",
      Salty = "salty",
      Bitter = "bitter",
      Savory = "savory"
    }
    interface FlavoredFoodItem {
      name: string;
      cost: number;
      flavorProfile: Flavor;
    }

    let cheezits: FlavoredFoodItem = {
      name: "Box of Cheezits",
      cost: 4,
      flavorProfile: Flavor.Salty
    };

    // Flavored food is structurally compatible with regular food
    let freshBakedCheezits = bakeryPriceStatement(cheezits);

    function flavoredFoodPriceStatement(item: FlavoredFoodItem) {
      return `That ${item.flavorProfile} ${item.name} will be ${item.cost}.`;
    }

    // But regular food isn't assignable to a type that expects flavored food
    // typings:expect-error
    let noCroissants = flavoredFoodPriceStatement(croissant);

    // In the future, we'll use AssertAssignable to prove structural compatibility or lack thereof:
    type _t1 = AssertAssignable<BakeryItem, FlavoredFoodItem>;
    // typings:excpect-error
    type _t2 = AssertAssignable<BakeryItem, FlavoredFoodItem>;
  });
});
