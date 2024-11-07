# Workout Tracker Mobile Plan

## Database Schema
1. User Schema
```
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true},
  password: { type: String, required: true }, //hash before storing
  followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
```
2. Exercise Schema
```
const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weightType: {
  type: String,
  required: true,
  enum: ['barbell', 'dumbbell', 'selectorized', 'plate loaded', 'body weight', 'other']
  },
  muscleGroups: [
    { 
      type: String, 
      required: true, 
      enum: [
        'chest', 
        'back', 
        'shoulders', 
        'biceps', 
        'triceps', 
        'quadriceps', 
        'hamstrings', 
        'glutes', 
        'calves', 
        'core', 
        'forearms'
      ] 
    }
  ]
});
```
3. Workout Schema
```
const workoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workout_title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  totalVolume: {type: Number, required: true}
  exercises: [
    {
      exercise_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
      sets: [
        {
          reps: { type: Number, required: true },
          weight: { type: Number, required: true }, 
          oneRepMax: { type: Number, required: true},
          volume: { type: Number, required: true}
        }
      ]
    }
  ]
});
```
4. Personal Record Schema
```
const personalRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  weight: { type: Number, required: true },  // The weight lifted
  1RM: { type: Number, required: true },    // The one rep max
  Volume: { type: Number, required: true} // The max volume in one set
});
```

401 error if no jwt token unless specified otherwise
400 error for all other errors
## API End Points
### Users
- GET user's profile information
  - 404 if user does not exist
  - 200 with user object if does exist
- GET all users
  - 200 with list of all user objects, just containing name, email, followers, and following

- GET specific user's following
  - 200 with list of user id's of following
- GET specific user's followers
 - 200 with list of user id's of followers
- DELETE user
  - 200 confirmation
  - 404 if user does not exits
- POST user login
  - same as desktop
- POST user signup
  - same as desktop
- PATCH user's name
  - 200 confirmation
  -400 if less than 3 characters
- POST follow user
  - 404 if user does not exist
  - 200 confirmation
  - 409 if user already follows
- POST unfollow user
  - 404 if user does not exist
  - 200 confirmation
  - 409 if user does not follow
- GET all workouts of their following
  - 200 confirmation

### Exercises
- GET all exercises
  - 200 list of all exercises
- POST new exercise (only for me)
  - 200 confirmation
- DELETE exercise (only for me)
  - 200 confirmation
<!-- - GET exercises based on weight type
- GET exercises based on muscle groups
- GET exercises based on search query  will be done on front end-->

### Workouts
- GET all workouts, for logged in user
  - 200 list of workout objects
- POST new workout, for logged in user
  - 200 confirmation
  - 400 if all sets not filled out
- PUT existing workout, ie add/remove exercises, sets, or change weights for logged in user
  - 200 confirmation
  - 400 if all sets not filled out completely
- DELETE existing workout for logged in user
  - 200 confirmation

### Personal Records
- GET PRs for a specific user's specific exercise
  - 200 confirmation, with pr object
- PATCH personal records (will be done when workout is posted)
  - 200 confirmation
- POST new personal records (will be done when new acct is created)
