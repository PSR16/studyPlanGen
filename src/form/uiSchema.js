export const uiSchema = {
    type: "VerticalLayout",
    elements: [
        {
            type: 'VerticalLayout',
            elements: [
                {
                    type: 'HorizontalLayout',
                    elements: [ 
                        {
                            type: "Control",
                            scope: "#/properties/classType",
                            options: {
                                format: 'radio'
                            }
                        },
                        {
                            type: "Control",
                            scope: "#/properties/className",
                        },
                    ]
                },
               /* {
                    type: 'HorizontalLayout',
                    elements: [
                        {
                            type: "Control",
                            scope: "#/properties/studyStartDate",
                        },
                        {
                            type: "Control",
                            scope: "#/properties/testDate",
                        },
                        {
                            type: "Control",
                            scope: "#/properties/studyDaysPerWeek",
                        },
                        {
                            type: "Control",
                            scope: "#/properties/hoursOfStudyPerDay",
                        },
                    ]
                },*/
                {
                    type: "Control",
                    scope: "#/properties/topicsCovered",
                    options: {
                        elementLabelProp: "topic",
                        detail: {
                            type: "VerticalLayout",
                            elements: [
                                {
                                    type: "Control",
                                    scope: "#/properties/topic",
                                },
                                {
                                    type: "Label",
                                    text: "The more information you provide, the more detailed your suggested plan will be"
                                },
                                {
                                    type: "Control",
                                    scope: "#/properties/objectives",
                                    options: {
                                        multi: true
                                    }
                                },
                                {
                                    type: "Control",
                                    scope: "#/properties/keyConcepts",
                                    options: {
                                        multi: true
                                    }
                                },
                                {
                                    type: "Control",
                                    scope: "#/properties/comfortOnTopic",
                                    options: {
                                        slider: true
                                    }
                                },
                                {
                                    type: 'HorizontalLayout',
                                    elements: [
                                        {
                                            type: "Control",
                                            scope: "#/properties/studyMethods",
                                        },
                                    ]
                                }
                            ]
                        }
                    }
                }
            ]
        }
    ]
}
