## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Questions

1. What is the difference between Component and PureComponent? give an example where it might break my app.
   Component and PureComponent are classes for creating reusable UI components.
   The difference is that PureComponent implements a method called `shouldComponentUpdate()` that
   does a shallow comparison of the component's new and previous props and state. It means that `PureComponent` will update the component only if any of its props or state have changed in value, not just in reference, while the `Component`always re-render even the props or state have the same value as before.
2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
   `shouldComponentUpdate()` is a method of life cycle that is used to decide if a component should be rendered or not.
   When we use `Context` to pass information from the parent to the children, any change in the context triggers an update in all descendent components, even if their props have not changed.
   If a component uses `shouldComponentUpdate()` to avoid unnecessary updates and the value of `Context`is updated, the component will not update, even though the data in `Context`has changed.
3. Describe 3 ways to pass information from a component to its PARENT.
   - Props: is the most common way to pass information, a parent component define a data/method and pass it to the child component.
   - Context: through `Context` a child component can update that `Context`, and the parent component can red the updated value from the `Context`.
   - Callback Functions: a parent define a function and pass it to the chid, and it can call this function with the data as an argument.
4. Give 2 ways to prevent components from re-rendering.
   - Using `shouldComponentUpdate()` method in your component and make sure it returns false if you don't want the component to re-render.
   - Using `React.memo()`, it checks for shallow equality of props and will only re-render the component if the props have changed.
5. What is a fragment and why do we need it? Give an example where it might break my app.
   A `Fragment` is a component (tag) that allows us to group a list of children elements without adding an extra node to the DOM.
   Using a `Fragment` to wrapper a list of elements in a project with an older version of React (before version 16.2) that does not support it, can break the app.

6. Give 3 examples of the HOC pattern.
   I don't remember right now.
7. what's the difference in handling exceptions in promises, callbacks and
   async...await.
   - Promises: use the `.then()` and `.catch()` methods to handle success and error cases, respectively.
   - Callbacks: in case of error the callback functions is called with an error objects as the first argument.
   - async. .. await: it manage the errors using a `try... catch` block. The `try` block contains the code that might throw an error, while the `catch` block is executed when an error is caught.
8. How many arguments does setState take and why is it async.
   It can take 1 or 2 arguments, depending on how it's called, generally
   When we call `setState`, React will not immediately update the component's state and re-render the component. Instead, it will schedule the update and puts it in a queue, and after batch together multiple updates that happen within the same event loop.
9. List the steps needed to migrate a Class to Function Component.

   - Copy the return section, inside the `render()` method, in a new Function component.
   - Remove the class specific keywords, the `this` keyword from all references to props, state and methods, you can access to the props directlyl as arguments and use the `useState` hook to manage state.
   - Replace lifecycle methods, in the case that you Class component uses `componentDidMount()`, you can replace them with the `useEffect` hook.
   - Remove the Class declaration and andy other Class-specific syntax, such as the `constructor` method.

10. List a few ways styles can be used with components.
    - Inline styles: styles can be applied directly to the JSX elements using inline styles.
    - External stylesheets: styles are defined in a separate CSS file and imported into the component using the `import` statement.
    - Inline classes: are defined as a string and assigned to the `className` prop of the JSX element.
    - CSS in JS libraries: there are libraries that define styles in them and we can use this after in JS or TS code.
11. How to render an HTML string coming from the server.
    I am not sure but I think that we can use `dangerousSetInnertHTML` or `ReactDomServer.renderToString()` method.
