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
    description: "Everything related to working on the vehicles.",
    creator_id: 1
)

project3 = Project.create!(
    name: "Marketing",
    description: "Marketing Tasks",
    creator_id: 2
)

team1 = Team.create!(
    name: "Flatiron",
    description: "Cody's Flatiron Projects",
    auth_users: [1],
    creator_id: 1
)

team2 = Team.create!(
    name: "Personal Workspace",
    description: "Cody's Personal Projects",
    auth_users: [1],
    creator_id: 1
)

team3 = Team.create!(
    name: "Kelli Radwanski Photography",
    description: "Kelli's Work Projects",
    auth_users: [2],
    creator_id: 2
)

task1 = user1.tasks.create!(
    name: "Finish refactoring",
    due_date: Date.new(2023, 9, 7),
    description: "Give everything a final once over and stress test it.",
    project_id: 1,
    team_id: 1
)

task2 = user1.tasks.create!(
    name: "Create the detail page for single tasks",
    due_date: Date.new(2023, 9, 7),
    description: "Create the view page for a single task after clicking on it",
    project_id: 1,
    team_id: 1
)

task3 = user2.tasks.create!(
    name: "Finish Marketing Research",
    due_date: Date.new(2023, 9, 7),
    description: "Finish watching marketing videos",
    project_id: 3,
    team_id: 3
)