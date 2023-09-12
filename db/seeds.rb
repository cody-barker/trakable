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
    name: "Auto",
    description: "Random bits and bobs without a proper home.",
    creator_id: 1
)

project3 = Project.create!(
    name: "Work",
    description: "Work Tasks",
    creator_id: 2
)

workspace1 = Workspace.create!(
    name: "School",
    description: "Cody's Flatiron Projects",
    creator_id: 1
)

workspace2 = Workspace.create!(
    name: "Personal",
    description: "Cody's Personal Projects",
    creator_id: 1
)

workspace3 = Workspace.create!(
    name: "Work",
    description: "Kelli's Work Projects",
    creator_id: 2
)

task1 = user1.tasks.create!(
    name: "Wash the car",
    due_date: Date.new(2023, 9, 6),
    description: "Wash and vacuum the car",
    project_id: 2,
    workspace_id: 2
)

task2 = user1.tasks.create!(
    name: "Create the detail page for single tasks",
    due_date: Date.new(2023, 9, 7),
    description: "Create the view page for a single task after clicking on it",
    project_id: 1,
    workspace_id: 1,
)

task3 = user2.tasks.create!(
    name: "Finish Marketing Research",
    due_date: Date.new(2023, 9, 7),
    description: "Finish watching marketing videos",
    project_id: 3,
    workspace_id: 3,
)