count = [0, 0]
prev = [-1, -1]

window = []

File.foreach('input/day01.txt') do |line|
  num = line.to_i
  count[0] += 1 if (prev[0]).positive? && num > prev[0]
  prev[0] = num
  window << num
  if window.size > 3
    window.shift
    sum = window.sum
    count[1] += 1 if sum > prev[1]
    prev[1] = sum
  end
end

puts count
