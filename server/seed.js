const mongoose = require('mongoose');
const Category = require('./models/Category');
const Post = require('./models/Post');
const User = require('./models/User');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-blog');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Category.deleteMany();
    await Post.deleteMany();
    await User.deleteMany();

    // Create sample user
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      bio: 'A passionate blogger sharing insights on technology and life.'
    });

    // Create categories one by one to avoid slug conflicts
    const categoryData = [
      { name: 'Technology', description: 'Latest tech trends and innovations', color: '#007bff' },
      { name: 'Lifestyle', description: 'Tips for better living and wellness', color: '#28a745' },
      { name: 'Travel', description: 'Amazing destinations and travel experiences', color: '#17a2b8' },
      { name: 'Food', description: 'Delicious recipes and culinary adventures', color: '#fd7e14' },
      { name: 'Business', description: 'Entrepreneurship and business insights', color: '#6f42c1' },
      { name: 'Health', description: 'Health and fitness tips', color: '#e83e8c' },
      { name: 'Education', description: 'Learning and educational content', color: '#20c997' },
      { name: 'Entertainment', description: 'Movies, music, and entertainment news', color: '#ffc107' }
    ];

    const categories = [];
    for (const catData of categoryData) {
      const category = await Category.create(catData);
      categories.push(category);
    }

    // Create sample posts one by one to avoid slug conflicts
    const posts = [];
    const postData = [
      {
        title: 'The Future of Artificial Intelligence in 2024',
        content: `Artificial Intelligence continues to evolve at an unprecedented pace. In 2024, we're seeing remarkable advancements in machine learning, natural language processing, and computer vision.

        From autonomous vehicles to personalized medicine, AI is transforming every industry. Companies are investing billions in AI research, and the results are astonishing.

        However, with great power comes great responsibility. As AI becomes more sophisticated, we must address ethical concerns, data privacy, and the potential impact on employment.

        The key to successful AI implementation lies in responsible development and thoughtful regulation. Organizations that prioritize ethical AI practices will be the ones leading the charge into this exciting future.`,
        excerpt: 'Exploring the latest developments in AI and what they mean for our future.',
        category: categories[0]._id,
        author: user._id,
        tags: ['AI', 'Technology', 'Future', 'Innovation'],
        published: true
      },
      {
        title: '10 Essential Productivity Hacks for Remote Workers',
        content: `Working from home has become the new normal for millions of people worldwide. While remote work offers flexibility and freedom, it also presents unique challenges that can impact productivity.

        Here are 10 essential productivity hacks that have helped countless remote workers stay focused and efficient:

        1. **Create a Dedicated Workspace**: Designate a specific area in your home for work to help your brain associate that space with productivity.

        2. **Establish a Routine**: Start and end your workday at consistent times to maintain work-life balance.

        3. **Use the Pomodoro Technique**: Work for 25 minutes straight, then take a 5-minute break. This helps maintain focus and prevents burnout.

        4. **Limit Distractions**: Use website blockers and put your phone on "Do Not Disturb" mode during work hours.

        5. **Set Clear Goals**: Start each day with a prioritized to-do list to stay organized and motivated.

        6. **Take Regular Breaks**: Step away from your computer every hour to stretch and clear your mind.

        7. **Stay Connected**: Schedule regular check-ins with your team to maintain collaboration and avoid isolation.

        8. **Invest in Quality Equipment**: A good chair, ergonomic setup, and reliable internet connection are essential.

        9. **Practice Self-Care**: Get enough sleep, exercise regularly, and eat nutritious meals to maintain energy levels.

        10. **Track Your Progress**: Use tools to monitor your productivity and celebrate small wins.

        Implementing these hacks can significantly improve your remote work experience and help you achieve better results.`,
        excerpt: 'Boost your productivity with these proven strategies for successful remote work.',
        category: categories[1]._id,
        author: user._id,
        tags: ['Productivity', 'Remote Work', 'Tips', 'Work Life'],
        published: true
      },
      {
        title: 'Hidden Gems: Underrated Travel Destinations in Europe',
        content: `While Paris, London, and Rome continue to attract millions of tourists each year, Europe is home to countless hidden gems that offer authentic experiences away from the crowds.

        Here are some underrated destinations that should be on every traveler's bucket list:

        **Rovinj, Croatia**
        This charming coastal town on the Istrian peninsula boasts colorful architecture, crystal-clear waters, and a medieval old town. The absence of large cruise ships means you can enjoy the authentic Croatian experience without the tourist hustle.

        **Hallstatt, Austria**
        Often called "the most photographed village in the world," Hallstatt is a fairy-tale village nestled between mountains and a pristine lake. The lack of crowds allows you to truly immerse yourself in the alpine beauty.

        **Sintra, Portugal**
        Just a short train ride from Lisbon, Sintra offers stunning palaces, lush gardens, and mystical castles perched on hills. The romantic atmosphere and natural beauty make it perfect for nature lovers and history enthusiasts.

        **Giethoorn, Netherlands**
        Known as the "Venice of the North," this village has no roads - only canals and thatched-roof houses connected by wooden bridges. It's a peaceful retreat where you can explore by boat or bicycle.

        **Bibury, England**
        This picturesque Cotswolds village is home to Arlington Row, a collection of 17th-century weavers' cottages that inspired many famous artists. The honey-colored stone buildings and willow-lined river create an idyllic English scene.

        These destinations offer unique cultural experiences, breathtaking scenery, and a chance to connect with locals in ways that larger tourist hotspots cannot provide. Planning a trip to these hidden gems will reward you with memories that last a lifetime.`,
        excerpt: 'Discover Europe\'s best-kept secrets - charming destinations that offer authentic experiences away from the crowds.',
        category: categories[2]._id,
        author: user._id,
        tags: ['Travel', 'Europe', 'Hidden Gems', 'Adventure'],
        published: true
      },
      {
        title: 'The Art of Mindful Eating: Transforming Your Relationship with Food',
        content: `In our fast-paced world, eating has become a rushed activity often done while multitasking. Mindful eating offers a revolutionary approach to how we nourish our bodies and connect with our food.

        **What is Mindful Eating?**

        Mindful eating is the practice of paying full attention to the experience of eating and drinking. It involves being present in the moment, observing your thoughts and feelings about food without judgment.

        **Benefits of Mindful Eating:**

        1. **Better Digestion**: When you eat slowly and chew thoroughly, your body can better process nutrients.

        2. **Weight Management**: Mindful eating helps you recognize true hunger and fullness cues.

        3. **Reduced Stress**: The practice promotes relaxation and reduces emotional eating.

        4. **Enhanced Enjoyment**: Food becomes more pleasurable when you fully experience its flavors and textures.

        5. **Healthier Choices**: Awareness leads to more nutritious food selections.

        **How to Practice Mindful Eating:**

        - **Eat Without Distractions**: Turn off the TV and put away your phone during meals.

        - **Engage Your Senses**: Notice the colors, smells, textures, and flavors of your food.

        - **Eat Slowly**: Take small bites and chew thoroughly before swallowing.

        - **Listen to Your Body**: Pay attention to hunger and fullness signals.

        - **Express Gratitude**: Appreciate the effort that went into producing your food.

        - **Practice Portion Control**: Serve smaller portions and eat until satisfied, not stuffed.

        **Getting Started:**

        Begin with one mindful meal per day. Sit down at a table, take a few deep breaths, and focus entirely on your eating experience. Over time, this practice will become a natural part of your daily routine.

        Remember, mindful eating is not about restriction or dieting. It's about developing a healthier, more joyful relationship with food and your body.`,
        excerpt: 'Learn how to transform your eating habits and develop a healthier relationship with food through mindfulness.',
        category: categories[3]._id,
        author: user._id,
        tags: ['Mindful Eating', 'Health', 'Wellness', 'Nutrition'],
        published: true
      },
      {
        title: 'Building a Successful Startup: Lessons from Industry Leaders',
        content: `Starting a business is one of the most challenging yet rewarding endeavors. While there's no guaranteed formula for success, learning from those who've walked the path before you can provide valuable insights.

        **Key Lessons from Successful Entrepreneurs:**

        1. **Start with a Problem, Not a Solution**
           The most successful businesses solve real problems. Steve Jobs didn't start with the iPhone; he started with the problem of complicated technology.

        2. **Validate Your Idea Early**
           Don't build something nobody wants. Talk to potential customers, run surveys, and create minimum viable products to test your assumptions.

        3. **Focus on Customer Experience**
           Your product might be great, but if customers don't love using it, they won't come back. Obsess over user experience and iterate based on feedback.

        4. **Build a Strong Team**
           No one succeeds alone. Surround yourself with people who complement your skills and share your vision. Culture matters as much as talent.

        5. **Be Prepared to Pivot**
           Most successful companies look very different from their original concept. Stay flexible and be willing to change direction based on market feedback.

        6. **Prioritize Cash Flow**
           Profitability is important, but cash flow keeps your business alive. Understand your burn rate and plan for different scenarios.

        7. **Learn from Failure**
           Every successful entrepreneur has failed multiple times. The key is to fail fast, learn quickly, and keep moving forward.

        8. **Network Relentlessly**
           Relationships open doors. Attend industry events, join communities, and build genuine connections with mentors and peers.

        **Common Pitfalls to Avoid:**

        - Trying to do everything yourself
        - Ignoring customer feedback
        - Scaling too quickly
        - Neglecting personal health and relationships
        - Compromising on core values

        **Final Thoughts:**

        Entrepreneurship is a marathon, not a sprint. Success rarely happens overnight. Stay persistent, keep learning, and remember that every "no" brings you closer to a "yes."

        The journey will test your resilience, creativity, and commitment. But for those who persevere, the rewards of building something meaningful are immeasurable.`,
        excerpt: 'Essential lessons from successful entrepreneurs that can guide your startup journey.',
        category: categories[4]._id,
        author: user._id,
        tags: ['Entrepreneurship', 'Business', 'Startups', 'Success'],
        published: true
      },
      {
        title: 'The Science of Sleep: Why Quality Rest Matters More Than Quantity',
        content: `We spend about one-third of our lives sleeping, yet many of us don't prioritize this essential activity. While getting enough sleep is important, the quality of your sleep matters just as much as the quantity.

        **Understanding Sleep Cycles**

        Sleep isn't a uniform state but consists of several cycles, each lasting about 90 minutes:

        - **Stage 1 (Light Sleep)**: Transition between wakefulness and sleep
        - **Stage 2 (Light Sleep)**: Body temperature drops, heart rate slows
        - **Stage 3 (Deep Sleep)**: Essential for physical restoration and immune function
        - **REM Sleep**: Associated with dreaming and memory consolidation

        **Why Quality Matters**

        1. **Cognitive Function**: Quality sleep improves focus, creativity, and problem-solving abilities.

        2. **Emotional Health**: Good sleep regulates mood and reduces stress and anxiety.

        3. **Physical Health**: Quality rest supports immune function, hormone regulation, and tissue repair.

        4. **Weight Management**: Poor sleep disrupts hunger hormones, leading to increased appetite.

        5. **Cardiovascular Health**: Quality sleep reduces the risk of heart disease and stroke.

        **Tips for Better Sleep Quality**

        - **Maintain a Consistent Schedule**: Go to bed and wake up at the same time every day, even on weekends.

        - **Create a Sleep-Friendly Environment**: Keep your bedroom cool, dark, and quiet. Invest in a comfortable mattress and pillows.

        - **Limit Screen Time**: Blue light from devices interferes with melatonin production. Avoid screens at least an hour before bed.

        - **Watch Your Diet**: Avoid large meals, caffeine, and alcohol close to bedtime.

        - **Establish a Wind-Down Routine**: Create relaxing pre-sleep rituals like reading or gentle stretching.

        - **Exercise Regularly**: Physical activity promotes better sleep, but avoid intense workouts close to bedtime.

        - **Manage Stress**: Practice relaxation techniques like meditation or deep breathing.

        **Common Sleep Myths Debunked**

        - **Myth**: You can "catch up" on sleep on weekends.
          **Fact**: Sleep debt accumulates and can't be fully repaid.

        - **Myth**: Snoring is harmless.
          **Fact**: It may indicate sleep apnea, which affects sleep quality.

        - **Myth**: Older adults need less sleep.
          **Fact**: Sleep needs remain constant throughout adulthood.

        **When to Seek Help**

        If you consistently struggle with sleep despite good habits, consult a healthcare professional. Chronic sleep issues may indicate underlying conditions that require treatment.

        Remember, quality sleep is an investment in your health, productivity, and overall well-being. Prioritize it like you would any other important aspect of your life.`,
        excerpt: 'Discover why sleep quality is crucial for health, productivity, and well-being.',
        category: categories[5]._id,
        author: user._id,
        tags: ['Sleep', 'Health', 'Wellness', 'Science'],
        published: true
      }
    ];

    for (const post of postData) {
      const createdPost = await Post.create(post);
      posts.push(createdPost);
    }

    console.log('Sample data seeded successfully!');
    console.log(`Created ${categories.length} categories and ${posts.length} posts`);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed function
connectDB().then(() => {
  seedData();
});
