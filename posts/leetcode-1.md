# A few leetcode problems

*Date: 2025-06-21*

A few leetcode problem solutions

## 1 - Two sum

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> complementos = new HashMap<Integer, Integer>();

        for (int i = 0; i < nums.length; i++) {
            int resto = target - nums[i];

            if (complementos.containsKey(resto)) {
                return new int[] {complementos.get(resto), i};
            }

            complementos.put(nums[i], i);
        }
        return null;
    }
}
```

### 3 - Longest substring without repeating characters

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        List<Integer> substringSizes = new ArrayList<>();
        Map<String, Integer> dict = new HashMap<>();

        int longestSubstring = 0;
        int start = 0;

        for (int i = 0; i < s.length(); i++) {
            char currCharacter = s.charAt(i);

            if (!dict.containsKey(String.valueOf(currCharacter))) {
                longestSubstring++;
                dict.put(String.valueOf(currCharacter), i);
            } else {
                substringSizes.add(longestSubstring);

                int index = dict.get(String.valueOf(currCharacter));

                for (int j = start; j <= index; j++) {
                    dict.remove(String.valueOf(s.charAt(j)));
                }

                start = index + 1;

                longestSubstring = i - index;
                dict.put(String.valueOf(currCharacter), i);
            }
        }

        substringSizes.add(longestSubstring);

        Collections.sort(substringSizes);
        return substringSizes.getLast();
    }
}
```

### 102 - Binary tree level order traversal

```java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        if (root == null) return new ArrayList<>();

        Deque<TreeNode> queue = new LinkedList<>();
        queue.add(root);

        List<List<Integer>> result = new ArrayList<>();
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currLevel = new ArrayList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.pollFirst();
                currLevel.add(node.val);

                if (node.left != null) queue.addLast(node.left);
                if (node.right != null) queue.addLast(node.right);
            }

            result.add(currLevel);
        }
        return result;
    }
}
```

### 56 - Merge intervals

```java
class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, Comparator.comparing(a -> a[0]));

        List<int[]> merged = new ArrayList<>();
        for (int[] interval: intervals) {
            if (merged.isEmpty() || merged.getLast()[1] < interval[0]) {
                merged.add(interval);
            } else {
                merged.getLast()[1] = Math.max(merged.getLast()[1], interval[1]);
            }
        }

        return merged.toArray(new int[merged.size()][]);
    }
}
```

---

*Tags: leetcode*