export const schema = {
    type: "object",
    properties: {
        classType: {
            type: "string",
            enum: ['AP Class (High School)', 'Graduate', 'Undergraduate', 'Certification'],
        },
        className: {
            type: 'string'
        },
        studyDaysPerWeek: {
            type: 'integer'
        },
        hoursOfStudyPerDay: {
            type: 'number'
        },
        studyStartDate: {
            type: 'string',
            format: 'date'
        },
        testDate: {
            type: 'string',
            format: 'date'
        },
        topicsCovered: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    topic: {
                        type:'string',
                        default: ''
                    },
                    objectives: {
                        type:'string',
                        description: "Learning objectives",
                        default: ''
                    },
                    keyConcepts: {
                        type:'string',
                        description: "Key terms and concepts associated with this topic",
                    },
                    comfortOnTopic: {
                        type: 'number',
                        minimum: 1,
                        maximum: 5,
                        default: 2,
                        description: "How comfortable are you with this topic? 1: ELI5 5: I'm ready!"
                    },
                    studyMethods: {
                        type: 'array',
                        description: 'Study Tools to Generate',
                        uniqueItems: true,
                        items: {
                            type: 'string',
                            enum: ['Mindmap', 'Multiple Choice Questions']
                        }
                    }
                }
            }

        },
        keyConcepts: {
            type: 'string'
        },
        objectives: {
            type: 'string'
        }
    }
}