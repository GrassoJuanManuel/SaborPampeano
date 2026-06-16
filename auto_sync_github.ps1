$folderToWatch = "G:\Mi unidad\Sabor Pampeano Workspace"
$filter = "*.*"  

$watcher = New-Object IO.FileSystemWatcher $folderToWatch, $filter -Property @{
    IncludeSubdirectories = $true
    NotifyFilter = [IO.NotifyFilters]::FileName, [IO.NotifyFilters]::LastWrite
}

$action = {
    $path = $Event.SourceEventArgs.FullPath
    $changeType = $Event.SourceEventArgs.ChangeType
    
    # Ignore git internal changes and backups to avoid infinite loops
    if ($path -match "\\.git\\" -or $path -match "\\Backups\\") { return }

    # Debounce: wait a bit before pushing to group multiple saves
    Start-Sleep -Seconds 5
    
    # Execute Git commands
    Set-Location $folderToWatch
    python sync_priorities.py
    python build_biblia.py
    git add .
    git commit -m "Auto-update: $changeType on $(Split-Path $path -Leaf)"
    git push origin main
}

Register-ObjectEvent $watcher "Changed" -Action $action
Register-ObjectEvent $watcher "Created" -Action $action
Register-ObjectEvent $watcher "Deleted" -Action $action
Register-ObjectEvent $watcher "Renamed" -Action $action

# Keep the script running
while ($true) { Start-Sleep 5 }
