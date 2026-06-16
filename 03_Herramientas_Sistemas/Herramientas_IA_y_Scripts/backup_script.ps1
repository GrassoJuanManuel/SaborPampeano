$source = "g:\Mi unidad\Sabor Pampeano Workspace"
$destBase = "C:\Users\jmgra\OneDrive\Desktop\Backup Workspace"

if (-Not (Test-Path $destBase)) { New-Item -ItemType Directory -Path $destBase | Out-Null }

$dateStr = (Get-Date).ToString("yyyy-MM-dd")
$destPath = Join-Path $destBase $dateStr

if (-Not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath | Out-Null }
Copy-Item -Path "$source\*" -Destination $destPath -Recurse -Force

$backups = Get-ChildItem -Path $destBase -Directory | Sort-Object CreationTime -Descending
$now = Get-Date
$toDelete = @()

# Tier 1: Primer mes (0-30 días) -> Conservamos TODOS (1 por día).
# Tier 2: Segundo mes (31-60 días) -> Conservamos 1 por SEMANA (el más reciente de cada semana).
# Tier 3: Tercer mes en adelante (>60 días) -> Conservamos 1 por MES (el más reciente de cada mes).

$olderThan30 = $backups | Where-Object { ($now - $_.CreationTime).TotalDays -gt 30 }

# Tier 2
$tier2 = $olderThan30 | Where-Object { ($now - $_.CreationTime).TotalDays -le 60 }
$t2Groups = $tier2 | Group-Object { 
    $week = [cultureinfo]::InvariantCulture.Calendar.GetWeekOfYear($_.CreationTime, [System.Globalization.CalendarWeekRule]::FirstFourDayWeek, [DayOfWeek]::Monday)
    "$($_.CreationTime.Year)-W$week" 
}
foreach ($g in $t2Groups) {
    $sorted = $g.Group | Sort-Object CreationTime -Descending
    for ($i = 1; $i -lt $sorted.Count; $i++) { $toDelete += $sorted[$i] }
}

# Tier 3
$tier3 = $olderThan30 | Where-Object { ($now - $_.CreationTime).TotalDays -gt 60 }
$t3Groups = $tier3 | Group-Object { $_.CreationTime.ToString("yyyy-MM") }
foreach ($g in $t3Groups) {
    $sorted = $g.Group | Sort-Object CreationTime -Descending
    for ($i = 1; $i -lt $sorted.Count; $i++) { $toDelete += $sorted[$i] }
}

# Ejecutar borrado
foreach ($d in $toDelete) {
    Remove-Item -Path $d.FullName -Recurse -Force
}
