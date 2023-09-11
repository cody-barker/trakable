user1 = User.create!(
    first_name: "Cody",
    last_name: "Barker",
    title: "Project Manager",
    password: "test",
    email: "codybarker.or@gmail.com"
)

user2 = User.create!(
    first_name: "Kelli",
    last_name: "Radwanski",
    title: "UX Lead",
    password: "test",
    email: "kelli.radwanski@gmail.com"
)

project1 = Project.create!(
    name: "Capstone",
    description: "As part of the Flatiron Software Engineering Flex program curriculum, all students must submit a Capstone project in Phase 5 in order to graduate.",
    creator_id: 1
)

project2 = Project.create!(
    name: "Miscellaneous",
    description: "Random bits and bobs without a proper home.",
    creator_id: 1
)

task1 = user1.tasks.create!(
    name: "Display all tasks",
    due_date: Date.new(2023, 9, 6),
    description: "Create the view page for displaying all of a user's tasks",
    project: project1
)

task2 = user1.tasks.create!(
    name: "Create the detail page for single tasks",
    due_date: Date.new(2023, 9, 7),
    description: "Create the view page for a single task after clicking on it",
    project: project2,
)
