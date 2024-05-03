const buildPrompt = (formData) => {
    const { classType, className, studyDaysPerWeek, studyStartDate, testDate, topicsCovered, hoursOfStudyPerDay } = formData;
  
    //The topics that will be covered on this exam are: ${topicsCovered}. 
    let background = `Imagine that you are in a ${classType}-level class titled ${className}. 
    You have a midterm coming up on ${testDate} and need to build a comprehensive study plan to learn new topics and review past topics through active studying methods. 
    
    Your task is to: generate a day-by-day study plan that starts on ${studyStartDate} and leads up to the exam date.
    Your schedule allows you to study ${hoursOfStudyPerDay} hours a day and you can study ${studyDaysPerWeek} days per week. 
    
    It is very critical to include all of the information from each of the topics in your study plan.

    Make sure that you focus on learning these new topics and also active recall to ensure review of past topics. 
    Include the following information in your study plan: topic, learning objectives, key concepts, active recall questions and objectives. 
    Suggestions of actionable study methods are: building tables, comparing and contrasting topics, vocabulary terms, draw flowcharts, draw a diagram.

    Make sure you provide only active study methods.
    
    Examples of active study actions to recommend are: 
    - Draw a diagram
    - Compare and contrast
    - Build a table
    - Write notecards and study notecards
    - Draw a flowchart

    Examples of bad study actions are:
    - Take a practice quiz or exam
    - Read the chapter in the book
    - Review notes
    - Watch a video

    Respond in only a parseable JSON object or array.`

    let example = `
    Ensure the days within the days array are all present within the same week.
    Remember that your schedule allows you to study ${hoursOfStudyPerDay} hours a day and you can study ${studyDaysPerWeek} days per week. 
    Suggest a recommended study time per day based on the ${hoursOfStudyPerDay} hours of study time available per day.
    For example, if you can study 3 hours, you could suggest 2pm - 3pm and 7pm - 9pm.

    An example of the expected JSON format is as follows: 
    [
        {
            week: 1,
            days: [
                {
                    date: "2020-04-01",
                    "topics": [
                        "Introduction to Immunology",
                        "Cells of the Immune System"
                      ],
                      "objectives": [
                        "Define immunology and its scope",
                        "Describe the different types of immune cells and their functions"
                      ],
                      "studyActions": [
                        "Create a diagram of the different types of immune cells"
                      ],
                    "recommendedStudyTime: "2pm - 3pm and 7pm - 8pm"

                }, 
                {
                    date: "2020-04-02",
                    "topics": [
                        "Innate Immunity",
                        "Complement System"
                      ],
                      "objectives": [
                        "Describe the mechanisms of innate immunity",
                        "Explain the role of the complement system in immune defense"
                      ],
                      "studyActions": [
                        "Summarize the key components of the innate immune system",
                        "Draw a flowchart of the complement cascade",
                        "Identify the key cells and molecules involved in innate immunity"
                      ],
                      "recommendedStudyTime: "1pm - 3pm"

                }
            ]
        },
        {
            week: 2,
            days: [
                {
                    date: "2020-04-06",
                    "topics": [
                        "Cells of the Immune System (continued)",
                        "Innate Immunity (continued)"
                      ],
                      "objectives": [
                        "Discuss the role of antigen-presenting cells in adaptive immunity",
                        "Describe the different types of innate immune cells and their functions"
                      ],
                      "studyActions": [
                        "Compare and contrast the functions of macrophages and neutrophils",
                        "Explain the role of dendritic cells in T cell activation",
                      ],
                      "recommendedStudyTime: "2pm - 3pm"
                }
            ]
        }
    ]
    `
    let topics = ''
    topicsCovered.forEach((topic) => {
        const { topic: topicName, objectives, keyConcepts, comfortOnTopic } = topic;
        let topicPrompt = `
        Build a study plan for ${topicName}.
        The learning objectives are: ${objectives}.

        The output should contain a list of objectives that you need to learn for that day and for the topic ${topicName}.
        The output should also contain a list of active study methods that are directly related to learning the objectives for the topic ${topicName}.
        Reference the background section for examples of effective active study methods.
        Take care to avoid repeating existing study methods and instead suggest new ones tailored to the provided objectives and key concepts.
        `

        if ([1,2,3].includes(comfortOnTopic)) {
            let comfortPrompt= `Comfort level on this topic is a ${comfortOnTopic} out of 5. Extra study methods and ideas should be presented to ensure mastery.`
            topicPrompt += comfortPrompt
        }
        topics += topicPrompt;
      });


    let prompt = background 
    + topics 
    + "Feel free to combine study plans from multiple topics on the same day to ensure coverage of all topics and comprehensive review. Multiple topics can and should be studied in one day."
    + example;

    return prompt;
  };
  
export { buildPrompt };
