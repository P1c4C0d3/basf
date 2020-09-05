# basf
Software Developer Test
Software Developer Test v1.0

Objective: Develop a small web application that would support a Virtual Assistant (a.k.a. Chatbot) to emulate a standard Service Desk attention; you will need to implement only the Frontend application based on any web technology and framework that you already know or used in the past; the backend part is mainly supported by APIs already implemented in two REST Services already available.

Solution: Implement one-page application that has a button or image that opens a modal window or any other html object that gives the user the functionality of interacting with a Chatbot. Please use the following image as a guide of the application to be implemented.

 
User interface Vitual Assistant Example

Technical Details: The application can use any ajax library or framework to make the API calls for basically creating a session in Watson Assistant (one time) and then send the user inputs to be interpreted by the cognitive services provided by the APIs. You will be given a SoapUI project for guidance of the two REST Services that need to be called to build the whole application.

 

 

SoapUI Project with Endpoints, APIKey and example requests:
 

Regarding look & feel, you can use styles to your page.

Tips: 
1)	Once you create the session in Watson, the first input message that you can send in the json request to the API might be an empty input for getting the welcome message, after that you need to send the user´s input to Watson.
2)	Download SoapUI before start implementing anything and import the file named “WatsonAssistantBasfServiceDesk-soapui-project.xml” and run it, this will give you a clear understanding of how the APIs calls works and only after that start implementing from your web application.
3)	Please notice that some responses coming back from the APIs calls have a special response type of “options” that you can parse to give options to the user to select.

 

Expected delivery and times: You can deploy the solution in any cloud provider using a free user account (this is a plus) or send the application and clear instructions on how to install it (including pre requisites) that would run locally the application in any personal computer that meets the pre reqs provided.
Finally, it is required to push your code to github in the following public project: https://github.com/P1c4C0d3/basf_swd_test for that you will need to provide your github user to be authorized to push the code.
There is no limit time to finish this test, but only the ones that finish the tests are considered to continue with the selection process.

If you have any doubt regarding during the test, please send an email to:
pablo.fraga@basf.com
