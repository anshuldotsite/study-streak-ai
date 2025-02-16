# Study Streak AI

## Inspiration
The idea for Study Streak AI was born out of the need for a tool that helps students improve their focus, build discipline, and enhance their productivity in a fun and motivating way. As students, we often struggle with staying consistent in our study routines, and the distractions are all around us. Inspired by common productivity techniques and the desire to gamify the study process, Study Streak AI was created to make studying more engaging and rewarding.

## What it does
Study Streak AI is an all-in-one study app that focuses on improving student productivity through features like streak tracking, Pomodoro timers, and a rewards system. The app allows students to:
- **Track their streaks**: Stay motivated by tracking consecutive study days in a competitive way.
- **Pomodoro Technique**: Focused work intervals followed by short breaks, with reward points earned for successful sessions.
- **Summarizer Tool**: A tool to summarize PDFs, images, and text to help students quickly extract important information (currently in development).
- **Reward Points System**: Earn points through features like Pomodoro or the summarizer and redeem them for rewards like coupons or discounts.
  
## How we built it
We developed Study Streak AI using a combination of front-end and back-end technologies:
- **Frontend**: The user interface was designed using next.js, focusing on creating an intuitive and visually appealing experience for users.
- **Backend**: We implemented the core features using node.js, handling the logic for streak tracking, the Pomodoro timer, and reward points management.
- **API Integration**: For the summarizer, we integrated openAi APIs to process text, images, and PDFs into summaries. This feature is still under development but promises to provide a streamlined study tool for students.
- **Database**: for database related to users and sessions we have used the 

## Challenges we ran into
The main challenge we faced during development was integrating the summarizer feature, which relies on OpenAi APIs. Due to some technical issues with the API, we were unable to implement the full functionality at this stage. However, we’ve created sample displays of the summarizer feature to demonstrate how it will work once the integration is complete.
Another challenge was ensuring smooth synchronization of user data, including tracking streaks and updating reward points across different devices. 

## Accomplishments that we're proud of
- Successfully implemented the streak tracking and Pomodoro timer features, which are core to the app's design and motivation system.
- Created a points-based reward system that encourages consistent use of the app and incentivizes students to study more regularly.
- Developed a user-friendly and visually appealing interface using next.ja, with smooth navigation and engaging design elements.

## What we learned
Through building Study Streak AI, we learned the importance of integrating motivation systems in educational tools. By using streaks and rewards, we can encourage students to stay focused and disciplined in their studies. We also learned a lot about API integration and how to handle complex tasks like text summarization and data synchronization across devices. Additionally, we gained insights into user-centered design, ensuring the app meets the needs of students while maintaining an enjoyable user experience.

## What's next for Study Streak AI
Looking ahead, we have several exciting features planned for Study Streak AI:
- **Course-Based Study Plans**: We will add a feature where students can focus on specific courses, especially helpful during exam seasons. This will allow students to have personalized study paths for their subjects.
- **Summarizer API Updates**: We are working on resolving the API integration issues so that the summarizer tool can be fully functional, enabling students to summarize PDFs, images, and text in real-time.
- **Brand Partnerships**: We plan to collaborate with brands to offer more rewarding coupons and discounts through the reward points system, making the app even more motivating for users.
  
As we continue to develop Study Streak AI, our goal is to create a comprehensive study tool that helps students achieve their academic goals while maintaining a balance between productivity and reward.


## How to run:
``` git clone https://github.com/anshuldotsite/study-streak-ai ```
``` yarn install ``` 
``` yarn run dev ```

