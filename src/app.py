def PalindromicSubstring(strParam):
    x = len(strParam)
    
    # Function to expand around the center
    def centerExpansion(left, right):
        while left >= 0 and right < x and strParam[left] == strParam[right]:
            left -= 1
            right += 1
        return strParam[left+1:right]  # Always returns a valid string (may be empty)

    longP = ""  # Initialize the longest palindrome as an empty string
    
    for i in range(x):
        # Check for odd-length palindrome
        oddP = centerExpansion(i, i)
        if len(oddP) > len(longP):
            longP = oddP
        
        # Check for even-length palindrome
        evenP = centerExpansion(i, i + 1)
        if len(evenP) > len(longP):  # Ensure no "None" comparison
            longP = evenP
    
    # Return "none" if no valid palindrome of length >= 2
    if len(longP) < 2:
        return "none"
    
    return longP

# Test the function with input
print(PalindromicSubstring("hellosannasmith"))
