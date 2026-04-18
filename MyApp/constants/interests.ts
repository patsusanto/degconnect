export type InterestCluster = {
  label: string;
  related: string[];
};

export const INTEREST_CLUSTERS: InterestCluster[] = [
  {
    label: 'Nightlife',
    related: ['Cocktails', 'Bars', 'Clubbing', 'Afterwork'],
  },
  {
    label: 'Sports',
    related: ['Basketball', 'Padel', 'Running', 'Fitness'],
  },
  {
    label: 'Live Music',
    related: ['Concerts', 'Open Mic', 'DJ Sets', 'Festivals'],
  },
  {
    label: 'Tech Talks',
    related: ['Startups', 'AI', 'Coding', 'Product Meetups'],
  },
  {
    label: 'Networking',
    related: ['Founders', 'Co-Working', 'Business Events', 'Meet & Greet'],
  },
  {
    label: 'Food Spots',
    related: ['Brunch', 'Coffee', 'Street Food', 'Wine Tastings'],
  },
  {
    label: 'Hiking',
    related: ['Mountain Tours', 'Cycling', 'Lakes', 'Weekend Trips'],
  },
  {
    label: 'Culture',
    related: ['Art Exhibitions', 'Comedy', 'Museums', 'Cinema'],
  },
  {
    label: 'Community',
    related: ['Volunteering', 'Language Exchange', 'Local Markets', 'Social Clubs'],
  },
];

export const MAIN_INTERESTS = INTEREST_CLUSTERS.map(cluster => cluster.label);

export const DEFAULT_INTERESTS = ['Networking', 'Live Music', 'Tech Talks'];

export function getSuggestedInterests(selectedInterests: string[]) {
  const selected = new Set(selectedInterests);
  const suggestions = new Set<string>();

  INTEREST_CLUSTERS.forEach(cluster => {
    const clusterIsRelevant =
      selected.has(cluster.label) || cluster.related.some(interest => selected.has(interest));

    if (!clusterIsRelevant) {
      return;
    }

    cluster.related.forEach(interest => suggestions.add(interest));
  });

  selectedInterests.forEach(interest => {
    if (!MAIN_INTERESTS.includes(interest)) {
      suggestions.add(interest);
    }
  });

  return Array.from(suggestions).filter(interest => !MAIN_INTERESTS.includes(interest));
}
