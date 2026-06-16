$source = "G:\Mi unidad\Sabor Pampeano Workspace"
$desktop = [Environment]::GetFolderPath("Desktop")
$destRoot = Join-Path $desktop "Backup Workspace"
$dateStr = Get-Date -Format "yyyyMMdd"
$dest = Join-Path $destRoot $dateStr

# Create backup root folder if it doesn't exist
if (-Not (Test-Path $destRoot)) { 
    New-Item -ItemType Directory -Force -Path $destRoot | Out-Null
}

# Create today's backup folder
if (-Not (Test-Path $dest)) { 
    New-Item -ItemType Directory -Force -Path $dest | Out-Null
}

# Copy the entire workspace to the backup folder
# Exclude the Backups folder we accidentally created in G: earlier to prevent nesting loops
Copy-Item -Path "$source\*" -Destination $dest -Recurse -Force -Exclude "Backups" -ErrorAction SilentlyContinue

# Cleanup old backups
# Keep daily backups for the last 15 days.
$limitDate = (Get-Date).AddDays(-15)

Get-ChildItem -Path $destRoot -Directory | Where-Object {
    # Check if folder name looks like a date yyyyMMdd
    $_.Name -match "^\d{8}$" -and $_.CreationTime -lt $limitDate
} | Remove-Item -Recurse -Force

Write-Host "Backup completado en $dest"
