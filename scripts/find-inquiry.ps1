Get-ChildItem -Recurse -Include page.tsx -Path app | Select-String "InquiryForm" | ForEach-Object { $_.Path + ":" + $_.LineNumber + ":" + $_.Line.Trim() }
