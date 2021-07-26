  ## Project setup - 
  ````
    -> Run npm init
    -> npm install --save-dev -lite-server
    -> Update packege.json - under script "start": "lite-server" // Now you can run "npm start" to start the application
    -> tsc --init
    -> update tsconfig.json with  "outDir": "./dist" & "rootDir": "./src",  
    -> npm start to start the applkication
    -> tsc -w for watch mode
    -> Set ""experimentalDecorators": true" in tsconfig.json for decorators.
    -> Set "module": "ES2015"
    -> Set "target": "es6",    
````