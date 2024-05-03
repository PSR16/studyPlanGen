import React, { useState } from 'react';
import { Paper, Typography, Checkbox, FormControlLabel, LinearProgress, Grid } from '@mui/material';

const StudyGuide = ({ studyPlan }) => {
    const [checkedItems, setCheckedItems] = useState({});

    const handleCheckboxChange = (topic, action) => {
        setCheckedItems({
            ...checkedItems,
            [topic]: {
                ...checkedItems[topic],
                [action]: !checkedItems[topic]?.[action]
            }
        });
    };

    const calculateProgress = (topic) => {
        const totalActions = studyPlan.find(item => item.topic === topic).studyActions.length;
        const completedActions = Object.values(checkedItems[topic] || {}).filter(Boolean).length;
        return (completedActions / totalActions) * 100;
    };

    const calculateOverallProgress = () => {
        let totalActions = 0;
        let completedActions = 0;

        studyPlan.forEach(({ topic, studyActions }) => {
            totalActions += studyActions.length;
            completedActions += Object.values(checkedItems[topic] || {}).filter(Boolean).length;
        });

        return (completedActions / totalActions) * 100;
    };

    return (
        <div>
            <LinearProgress variant="determinate" value={calculateOverallProgress()} />
            <Grid container spacing={4}>
                {studyPlan.map(({ topic, objectives, studyActions }, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', textAlign: 'left' }}>
                            <Typography variant="h6">{topic}</Typography>
                            <div style={{ margin: 10 }}>
                                <Typography variant="body1">
                                    <strong>Objectives:</strong>
                                    <div>
                                        {objectives.map((objective, index) => (
                                            <div key={index}>{objective}</div>
                                        ))}
                                    </div>
                                </Typography>
                            </div>
                            <Typography variant="body1">
                                <strong>Study Actions:</strong>
                                <div>
                                    {studyActions.map((action, index) => (
                                        <div key={index} style={{ marginBottom: '10px' }}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={checkedItems[topic]?.[action] || false}
                                                        onChange={() => handleCheckboxChange(topic, action)}
                                                    />
                                                }
                                                label={
                                                    <span style={{ textDecoration: checkedItems[topic]?.[action] ? 'line-through' : 'none' }}>
                                                        {action}
                                                    </span>
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                                <LinearProgress variant="determinate" value={calculateProgress(topic)} />
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default StudyGuide;
