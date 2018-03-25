class Investor():
	name = ""
	tokens = 0
	portfolio = dict()

	def addMoney(usd):
		tokens += usd

	def buy(channel, num):
		portfolio[channel] += num

	def sell(channel, askPrice, num):
		Market.postSell(name, channel, askPrice, num)
		portfolio[channel] -= num

	def takeMoney(tokenAmt):
		tokens -= tokenAmt
		return tokenAmt

class Channel():
	marketCap = 0
	shares = 0
	shareValue = marketCap/sharesTotal

	def startChannel(shareAmt):
		shares = shareAmt

class Market():
	sell = {} # {channel:[[seller, askPrice, num],[seller2, askPrice2, num2]]}
	buy = {} # {channel:[[buyer, askPrice, num],[buyer2, askPrice2, num2]]}

	def postSell(seller, channel, askPrice, num):
		sell[channel].append([seller, askPrice, num])

	def postBuy(buyer, channel, askPrice, num):
		buy[channel].append([buyer, askPrice, num])

	def check():
		for channel in sell:
			buy[channel].find([some, ])