const buildTopicPrompt = (topicName, objectives, comfortOnTopic) => {

    let topicPrompt = `
        Build a study plan for ${topicName}.
        
        The learning objectives are: ${objectives}.

        The output should contain a list of granular, specific objectives that you need to learn for the topic ${topicName}.
        The output should also contain a list of at least 5 active study methods that are directly related to learning the objectives for the topic ${topicName}.
        Take care to avoid repeating existing study methods and instead suggest new ones tailored to the provided objectives and key concepts.
       
        Make sure you provide only active study methods.
    
        Examples of effective, good active study actions to recommend are: 
        - Draw a diagram
        - Compare and contrast
        - Build a table
        - Write notecards and study notecards
        - Draw a flowchart
        - Make notecards of terms (be explicit on what terms to make notecards for)
    
        Examples of bad study actions to avoid recommending are:
        - Take a practice quiz or exam
        - Read the chapter in the book
        - Review notes
        - Watch a video
        `

    if ([1,2,3].includes(comfortOnTopic)) {
        let comfortPrompt= `Comfort level on this topic is a ${comfortOnTopic} out of 5. Extra study methods and ideas should be presented to ensure mastery.`
        topicPrompt += comfortPrompt
    }

    const example = `
    
    An example of the expected parseable JSON format is as follows: 
    {
        "topic": "Introduction to Immnunology",
        "objectives": [
            "Define immunology and its scope",
            "Describe the different types of immune cells and their functions"
            ],
        "studyActions": [
            "Create a diagram of the different types of immune cells",
            "Compare and contrast innate and adaptive immunity",
            ]
    }
    `
   
    let prompt =  topicPrompt + example;

    return prompt;
  };
  
export { buildTopicPrompt };
