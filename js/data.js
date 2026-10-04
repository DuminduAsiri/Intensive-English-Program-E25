/**
 * Intensive English Program E25 â€” Data Store
 * Groups, activities, panel members, committee, and submitted works.
 */

const DATA = {
  groups: [
    {
      "id": "765941e5-ce97-442b-8c01-a45f56c007e4",
      "slug": "group-cd-01",
      "name": "Group CD 01 – The Beginning",
      "tagline": "WHERE IT ALL BEGINS",
      "description": "Every journey starts with a single step. Discover new experiences, new friendships, and new opportunities to learn.",
      "cover_url": null,
      "sort_order": 1
    },
    {
      "id": "87ddf96e-deea-4ebc-b2b8-64bb27480567",
      "slug": "group-cd-02",
      "name": "Group CD 02 – The Second Chapter",
      "tagline": "EXPLORE. LEARN. GROW.",
      "description": "A space to explore ideas, develop new skills, and share meaningful experiences throughout our learning journey.",
      "cover_url": null,
      "sort_order": 2
    },
    {
      "id": "edcd3049-1802-474c-a473-9f1ee8116b53",
      "slug": "group-cd-03",
      "name": "Group CD 03 – Beyond the Words",
      "tagline": "IDEAS THAT BRING US TOGETHER",
      "description": "From creative activities to teamwork and presentations, discover how our ideas become memorable experiences.",
      "cover_url": null,
      "sort_order": 3
    },
    {
      "id": "33170e6f-f850-4cb2-b300-5f97e6c31a88",
      "slug": "group-cd-04",
      "name": "Group CD 04 – Our Shared Story",
      "tagline": "TOGETHER WE GROW",
      "description": "Celebrate the friendships, creativity, challenges, and achievements that made this chapter special.",
      "cover_url": "assets/group-cd-04.jpg",
      "sort_order": 4
    }
  ],

  activities: [
    {
      "id": "1370eefe-af82-4b20-a466-077df24ed8ba",
      "slug": "creative-corner",
      "title": "Creative Corner",
      "description": "Written assignments submitted by each group for the English language program.",
      "sort_order": 1,
      "image": "assets/assignments.jpg"
    },
    {
      "id": "e723a2bb-ee67-45e5-a151-9e7a6f311c00",
      "slug": "group-activities",
      "title": "Group Activities",
      "description": "Collaborative in-class and out-of-class activities carried out by the groups.",
      "sort_order": 2,
      "image": "assets/group-work.jpg"
    },
    {
      "id": "49361060-cb6e-48bc-a968-56be93253402",
      "slug": "presentations",
      "title": "Presentations",
      "description": "Slide decks and recorded presentations delivered by the groups.",
      "sort_order": 3,
      "image": "assets/presentations.jpg"
    },
    {
      "id": "c3b51ece-dfda-4e0a-8882-63a78763001e",
      "slug": "projects",
      "title": "Projects",
      "description": "Larger project work and reports produced during the program.",
      "sort_order": 4,
      "image": "assets/panel.jpg"
    }
  ],

  panelMembers: [
    {
      "id": "11a7719e-f32a-4728-b628-a4eeb7c4f813",
      "panel": "teachers",
      "full_name": "To be announced",
      "role": "Senior Lecturer in English",
      "bio": null,
      "photo_url": null,
      "sort_order": 1
    },
    {
      "id": "659ee82a-3ffc-4afe-9c5f-e807ba96234e",
      "panel": "teachers",
      "full_name": "To be announced",
      "role": "Lecturer in English",
      "bio": null,
      "photo_url": null,
      "sort_order": 2
    },
    {
      "id": "0689b8d6-289f-4137-9cd1-7a3ff42dabee",
      "panel": "teachers",
      "full_name": "To be announced",
      "role": "Instructor in English",
      "bio": null,
      "photo_url": null,
      "sort_order": 3
    },
    {
      "id": "ac964380-d246-4c7a-bff7-f3e4db8c4b8c",
      "panel": "web",
      "full_name": "Dumindu Asiri",
      "role": "Lead Coordinator",
      "bio": "Engineering undergraduate contributing to the portal development and maintenance.",
      "photo_url": "assets/dumindu.jpeg",
      "sort_order": 1
    },
    {
      "id": "eefd1662-289b-48e7-9c1f-cfbb2e267f55",
      "panel": "web",
      "full_name": "To be announced",
      "role": "Content Coordinator",
      "bio": null,
      "photo_url": null,
      "sort_order": 2
    },
    {
      "id": "cfae0abd-db66-40ae-b20e-6cfb80eb9179",
      "panel": "web",
      "full_name": "To be announced",
      "role": "Developer",
      "bio": null,
      "photo_url": null,
      "sort_order": 3
    }
  ],

  groupMembers: [
    {
      "id": "cd01-student-01",
      "group_id": "765941e5-ce97-442b-8c01-a45f56c007e4",
      "full_name": "Student Name",
      "role_in_group": "Student",
      "registration_no": "E25/001",
      "bio": null,
      "photo_url": null,
      "sort_order": 1,
      "committee": null
    },
    {
      "id": "cd02-student-01",
      "group_id": "87ddf96e-deea-4ebc-b2b8-64bb27480567",
      "full_name": "Student Name",
      "role_in_group": "Student",
      "registration_no": "E25/002",
      "bio": null,
      "photo_url": null,
      "sort_order": 1,
      "committee": null
    },
    {
      "id": "cd03-student-01",
      "group_id": "edcd3049-1802-474c-a473-9f1ee8116b53",
      "full_name": "Student Name",
      "role_in_group": "Student",
      "registration_no": "E25/003",
      "bio": null,
      "photo_url": null,
      "sort_order": 1,
      "committee": null
    },
    {
      "id": "d05f8703-0095-499f-b7ff-846ef641ebac",
      "group_id": "33170e6f-f850-4cb2-b300-5f97e6c31a88",
      "full_name": "Dumindu Asiri",
      "role_in_group": "Student",
      "registration_no": "E25/004",
      "bio": null,
      "photo_url": "assets/dumindu.jpeg",
      "sort_order": 1,
      "committee": "Web Committee"
    }
  ],

  contentItems: []
};

// Data Helper Functions
function getGroups() {
  return [...DATA.groups].sort((a, b) => a.sort_order - b.sort_order);
}

function getGroupBySlug(slug) {
  if (!slug) return DATA.groups[0];
  const normalized = String(slug).toLowerCase().trim();
  return DATA.groups.find(g =>
    g.slug === normalized ||
    g.id === slug ||
    g.name.toLowerCase() === normalized ||
    normalized.endsWith(g.slug.replace('group-cd-', '')) ||
    normalized.endsWith(g.slug.replace('group-cd-0', ''))
  );
}

function getGroupById(id) {
  if (!id) return null;
  const normalized = String(id).toLowerCase().trim();
  return DATA.groups.find(g =>
    g.id === id ||
    g.slug.toLowerCase() === normalized ||
    g.name.toLowerCase() === normalized ||
    normalized.endsWith(g.slug.replace('group-cd-', '')) ||
    normalized.endsWith(g.slug.replace('group-cd-0', ''))
  );
}

function getActivities() {
  return [...DATA.activities].sort((a, b) => a.sort_order - b.sort_order);
}

function getActivityById(id) {
  if (!id) return null;
  const normalized = String(id).toLowerCase().trim();
  return DATA.activities.find(a =>
    a.id === id ||
    a.slug.toLowerCase() === normalized ||
    a.title.toLowerCase() === normalized
  );
}

function isGroupMatch(itemGroupId, targetGroupIdOrSlug) {
  if (!itemGroupId || !targetGroupIdOrSlug) return false;
  if (itemGroupId === targetGroupIdOrSlug) return true;
  const targetGroup = typeof targetGroupIdOrSlug === 'object'
    ? targetGroupIdOrSlug
    : (getGroupById(targetGroupIdOrSlug) || getGroupBySlug(targetGroupIdOrSlug));
  if (!targetGroup) return false;
  if (itemGroupId === targetGroup.id || itemGroupId === targetGroup.slug) return true;
  const normItem = String(itemGroupId).toLowerCase().replace(/[^a-z0-9]/g, '');
  const normSlug = String(targetGroup.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const normName = String(targetGroup.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  return normItem === normSlug || normItem === normName;
}

function isActivityMatch(itemActivityId, targetActivityIdOrSlug) {
  if (!itemActivityId || !targetActivityIdOrSlug) return false;
  if (targetActivityIdOrSlug === 'all') return true;
  if (itemActivityId === targetActivityIdOrSlug) return true;
  const targetAct = typeof targetActivityIdOrSlug === 'object'
    ? targetActivityIdOrSlug
    : getActivityById(targetActivityIdOrSlug);
  if (!targetAct) return false;
  if (itemActivityId === targetAct.id || itemActivityId === targetAct.slug) return true;
  const normItem = String(itemActivityId).toLowerCase().replace(/[^a-z0-9]/g, '');
  const normSlug = String(targetAct.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const normTitle = String(targetAct.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  return normItem === normSlug || normItem === normTitle;
}

function getAllMembers() {
  let custom = [];
  try {
    const saved = localStorage.getItem('e25_custom_students');
    if (saved) custom = JSON.parse(saved);
  } catch (e) {}
  return [...DATA.groupMembers, ...custom];
}

function getMembersByGroupId(groupId) {
  return getAllMembers().filter(m => isGroupMatch(m.group_id, groupId));
}

function getAllContentItems() {
  let custom = [];
  try {
    const saved = localStorage.getItem('e25_custom_content');
    if (saved) custom = JSON.parse(saved);
  } catch (e) {}
  return [...DATA.contentItems, ...custom];
}

function getContentByGroupId(groupId) {
  return getAllContentItems().filter(c => isGroupMatch(c.group_id, groupId));
}

function getContentByActivityId(activityId) {
  return getAllContentItems().filter(c => isActivityMatch(c.activity_id, activityId));
}


