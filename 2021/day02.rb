horizontal = [0, 0]
depth = [0, 0]
aim = 0

File.foreach('input/day02.txt') do |line|
  action, val = line.split(' ')
  units = val.to_i
  case action
  when 'forward'
    horizontal[0] += units
    horizontal[1] += units
    depth[1] += units * aim
  when 'up'
    depth[0] -= units
    aim -= units
  when 'down'
    depth[0] += units
    aim += units
  end
end

puts [horizontal[0] * depth[0], horizontal[1] * depth[1]]
