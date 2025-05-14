import FeatureBlock from './FeatureBlock';

function Features() {
  return (
    <div>
      <FeatureBlock
        title="SUMMARIZE"
        description="Simplify dense content into casual, easy-to-understand summaries."
        imageSrc="/check.png"
      />
      <FeatureBlock
        title="DIAGRAM"
        description="Visualize complex information using dynamic flowcharts."
        imageSrc="/check.png"
        reverse
      />
      <FeatureBlock
        title="TEXT-TO-SPEECH"
        description="Listen to your summary read aloud in a natural voice."
        imageSrc="/check.png"
      />
      <FeatureBlock
        title="QUIZ"
        description="Test your understanding with auto-generated multiple choice quizzes."
        imageSrc="/check.png"
        reverse
      />
    </div>
  );
}

export default Features;