import { useState } from 'react'
import './App.css'
import { JsonForms} from '@jsonforms/react';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
import { uiSchema } from './form/uiSchema';
import { schema } from './form/schema';
import { Button, FormControl, InputLabel, MenuItem, Select, CircularProgress, Typography } from '@mui/material';
import StudyPlan from './components/StudyPlan';
import { callGeminiAPI } from './services/gemini';
import { classExamples } from './data/sampleClass'
import { buildTopicPrompt } from './data/topicPrompt';
import StudyGuide from './components/StudyGuide';

function App() {
  const [selectedClass, setSelectedClass] = useState('');
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [studyResponses, setStudyResponses] = useState([])

  const handleClick = async () => {
    setIsLoading(true)
  
    const prompts = data.topicsCovered.map(({ topic: topicName, objectives, comfortOnTopic }) => {
      return buildTopicPrompt(topicName, objectives, comfortOnTopic);
    });

    try {
      const responses = await Promise.all(prompts.map(prompt => callGeminiAPI(prompt)));
      const final = responses.map((r) => {
        console.log(r)
        return JSON.parse(r.replace(/(```json|```|`)/g, ''))
      });
      setIsLoading(false);
      // Process responses here
      console.log(final)
      setStudyResponses(final);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Typography variant='h1' style={{margin: 10}}>Study Guide Generator</Typography>
      <Typography variant='subtitle1' style={{margin: 10}}>To get started, select a class to prefill topics. Otherwise, enter your own class and topics you wish to generate a study plan for.</Typography>

       <div style={{marginBottom: '16px'}}>
          <FormControl fullWidth>
          <InputLabel id="class-select-label">Select a class</InputLabel>
          <Select
            labelId="class-select-label"
            id="class-select"
            value={selectedClass}
            label="Select a class"
            onChange={(e) => { setSelectedClass(e.target.value); setData(classExamples[e.target.value])}}
          >
            {Object.keys(classExamples).map(className => (
              <MenuItem key={className} value={className}>
                {className}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <JsonForms
          schema={schema}
          uischema={uiSchema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({data, errors}) => setData(data)}
        />
        <div style={{display: 'flex', justifyContent: 'center', margin: 20, gap: 16}}>
          <Button variant='contained' disabled={Object.keys(data).length < 1} onClick={handleClick}>Submit</Button>
          <Button variant='contained' onClick={() => setData('')}>Clear</Button>
        </div>
      </div>
      {
        isLoading && <CircularProgress />
      }

      {studyResponses.length >= 1 && !isLoading && 
        <div>
          <Typography variant='h2'>Study Guide</Typography>
          <StudyGuide studyPlan={studyResponses} />
        </div>
      }
    </div>
  )
}

export default App
