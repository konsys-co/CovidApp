# COVID19 Close Contact App

## Getting start

1. Clone the Repo
2. run `npm install`
3. To run on iOS, follow this [guideline](https://reactnative.dev/docs/getting-started) as:
   1. Install XCode from App Store.
   2. Install node and watchman (if you have nvm installed, you can skip this step)

   ```bash
   $ brew install node
   $ brew install watchman
   ``` 

   3. Install CoCoa pod
      1. For those using rbenv, set up global ruby version first before installing CoCoa Pod    
      
      ```bash
      $ rebenv global 2.6.2
      $ gem install cocoapods
      $ rbenv rehash
      ```
   4. Cd into the `./ios` folder
   5. run `pod install`